const Stacks = require('./stackoModel');

module.exports = {
  saveData: function(req, res) {

    //delete the url property
    console.log('data came back for US')
    const data = req.body.data.map( (ele) => {
      delete ele.url;
      return ele;
    })
    console.log('the amount of data is', data.length);

    Stacks.bulkCreate(data)
    .then( (result) => {
      console.log('added ' + data.length + ' rows');
      res.end();
    })
    .catch( (err) => console.log('error saving ' + data.length + ' jobs to database'));
  }

}


