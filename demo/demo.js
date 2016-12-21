const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const zipcodes = require('zipcodes');
const dataController = require('../dataController');
const Temperatures = require('../tempModel');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname)));
app.use('/scripts', express.static(__dirname + '/../assets/'));
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

app.post('/stackoverflow', dataController.stackOverflow);

app.post('/temperatures', dataController.temperatures);

app.get('/temperatures', (req, res) => {
  console.log('requesting temps');
  Temperatures.findAll()
  .then( (data) => {

    let newData = [];
    data.forEach( (datum) => {
      let zipData = zipcodes.lookup(datum.zip);
      if(zipData === undefined) return {};
      if(datum.temp && zipData.latitude && zipData.longitude) newData.push( { temp: datum.temp, lat: zipData.latitude, lng: zipData.longitude });
    })
    
    // setTimeout( () => {
    //   io.emit('temps', newData);
    // }, 5000);

    let interval = 100;
    let bunch = 250;
    let bunches = Math.ceil(newData.length / bunch);

    for(i = 0; i < newData.length; i += bunch) {
      let temps = [];
      for(j = 0; j < bunch && data[i+j]; j++) {
        temps.push(newData[i+j]);
      }
      setTimeout( () => {
        io.emit('temps', temps);
      }, interval * bunches);
    }


  })
  
  // for(let i = 0, counter = 100; i < 41268; i += Math.random() * 100, counter ++) {
  //   setTimeout( () => {
  //     io.emit('requests', { suc: Math.ceil(Math.random() * 98), err: Math.floor(Math.random() * 2) });
  //   }, 13 * counter)
  // }

  res.end();

});

io.on('connection', (client) => {
  console.log('client connected');

  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(3000, () => console.log(`listening on port ${PORT}`));





