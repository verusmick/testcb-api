var express = require('express');
var router = express.Router();
const testDB = require('../configDB')

/* GET users listing. */
router.get('/', function(req, res, next) {
  var query = 'SELECT * FROM authors';
  testDB.query(query, function (err, results) {
    if (err) throw err
    return res.json(results)
  })
});

module.exports = router;
