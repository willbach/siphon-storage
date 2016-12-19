const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataController = require('./dataController');
const path = require('path');

const PORT = 3000;

app.use(express.static(path.join(__dirname, './')));
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

app.post('/stackoverflow', dataController.stackOverflow);

app.post('/temperatures', dataController.temperatures);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
