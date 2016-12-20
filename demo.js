const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dataController = require('./dataController');
const Temperatures = require('./tempModel');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;

app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

app.post('/stackoverflow', dataController.stackOverflow);

app.post('/temperatures', dataController.temperatures);

app.get('/temperatures', (req, res) => {
  console.log('requesting temps');
  Temperatures.findAll()
  .then( (data) => {
    console.log('here is the data', data.length);
    let interval = 10;
    let bunch = 200;

    for(i = 0; i < data.length; i += bunch) {
      let temps = [];
      for(j = 0; j < bunch, data[j]; j++) {
        temps.push(data[i+j]);
      }
      console.log('bunch of temps for ya', temps.length);
      io.emit('temps', temps);
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
