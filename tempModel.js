const Sequelize = require('sequelize');
const pg = require('pg');

var sequelize = new Sequelize('siphon', 'siphon', 'testingsiphonwithansible', {
  host: 'localhost',
  dialect: 'postgres',

  ssl: true
});

const Temperatures = sequelize.define('temperatures', {
  zip: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  temp: {
    type: Sequelize.STRING
  }
});

sequelize
.sync()
.then(function(err) {
  console.log('Temperatures table created!');
}, function (err) {
  console.log('An error occurred while creating the temperatures table:', err);
});

module.exports = Temperatures;
