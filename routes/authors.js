var express = require('express');
var router = express.Router();
const testDB = require('../configDB')

/* GET authors listing. */
router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM author';
  testDB.query(query, function (err, results) {
    if (err) throw err
    return res.json(results)
  })
});

module.exports = router;
