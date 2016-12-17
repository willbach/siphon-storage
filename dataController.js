const Stacks = require('./stackoModel');

module.exports = {
  saveData: function(req, res) {

    //delete the url property
    const queries = req.body.data.map( (piece) => {
      return Stacks.upsert(piece.data);
    });
    Promise.all(queries)
    .then( (result) => console.log('added or modified ' + queries.length + ' rows'))
    .catch( (err) => console.log('there were some errors'));

    console.log('the amount of data is', data.length);

    res.end();
  }

}


