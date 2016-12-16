const Stacks = require('./stackoModel');

module.exports = {
  saveData: function(req, res) {

    //delete the url property
    const data = req.body.data.map( (ele) => ele.data);
    console.log('the amount of data is', data.length);
    data.forEach( (ele) => console.log(ele.id));

    Stacks.bulkCreate(data)
    .then( (result) => {
      console.log('added ' + data.length + ' rows');
      res.end();
    })
    .catch( (err) => {
      console.log('error saving ' + data.length + ' jobs to database');
      console.log(err);
      res.end();
    });
  }

}


