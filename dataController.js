const Stacks = require('./stackoModel');
const Temperatures = require('./tempModel');

module.exports = {
  stackOverflow: function(req, res) {

    const queries = req.body.data.map( (piece) => {
      if(piece.data.post) return Stacks.upsert(piece.data);
    });

    Promise.all(queries)
    .then( (result) => console.log('added or modified ' + queries.length + ' rows'))
    .catch( (err) => console.log('there were some errors'));

    console.log('the amount of data is', data.length);

    res.end();
  },
  temperatures: function(req, res) {
    const queries = req.body.data.map( (piece) => {
      if(piece.data.zip) return Temperatures.upsert(piece.data);
    });

    Promise.all(queries)
    .then( (result) => console.log('added or modified ' + queries.length + ' rows'))
    .catch( (err) => console.log('there were some errors'));

    res.end();
  }
}


