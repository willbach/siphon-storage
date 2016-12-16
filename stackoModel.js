const Sequelize = require('sequelize');
const pg = require('pg');

var sequelize = new Sequelize('siphon', 'siphon', 'testingsiphonwithansible', {
  host: 'localhost',
  dialect: 'postgres',

  ssl: true
});

const Stacks = sequelize.define('stacks', {
  post: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  title: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

sequelize
.sync({force: true})
.then(function(err) {
  console.log('Stackoverflow table created!');
}, function (err) {
  console.log('An error occurred while creating the table:', err);
});

module.exports = Stacks;
