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
    console.log('here is the data', data.length);

    data = data.map( (datum) => {
      let zipData = zipcodes.lookup(Number(datum.zip));
      return { temp: datum.temp, lat: zipData.latitude, lng: zipData.longitude }
    })

    console.log('a piece of data', data[0].temp)

    let interval = 10;
    let bunch = 200;
    let bunches = Math.ceil(data.length / bunch);

    for(i = 0; i < data.length; i += bunch) {
      let temps = [];
      for(j = 0; j < bunch && data[j]; j++) {
        temps.push(data[i+j]);
      }
      console.log('bunch of temps for ya', temps.length);
      setTimeout( () => {
        io.emit('temps', temps);
      }, interval * bunches);
    }

  })
  res.end();

});

io.on('connection', (client) => {
  console.log('client connected');
  
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(3000, () => console.log(`listening on port ${PORT}`));
