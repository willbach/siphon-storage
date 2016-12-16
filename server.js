const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataController = require('./dataController');

const PORT = 3000;


app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));



app.post('/data', dataController.saveData);



app.listen(PORT, () => console.log(`listening on port ${PORT}`));
