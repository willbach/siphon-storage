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
  })
  res.end();
  

  io.emit('game update', newState);

});

io.on('connection', (client) => {
  console.log('client connected');
  
  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(3000, () => console.log(`listening on port ${PORT}`));
