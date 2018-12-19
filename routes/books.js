var express = require('express');
var router = express.Router();
const testDB = require('../configDB')

/* GET books listing. */
router.get('/', function (req, res, next) {
  let query = 'SELECT * FROM book';
  testDB.query(query, function (err, results) {
    if (err) throw err;
    let promises = [];
    results.forEach(book => {
      promises.push(getAuthorBook(book.book_id));
    });

    Promise.all(promises).then((authorsList) => {
      results.forEach((result, index) => {
        result['authors'] = authorsList[index];
      });
      return res.json({status: "success", data: results});
    })
  })
});

/* POST books listing. */
router.post('/', function (req, res, next) {
  let body = req.body;
  var query = `INSERT INTO book (title, edition_date) VALUES ('${body.title}', '${body.editionDate}')`;
  testDB.query(query, function (err, results) {
    if (err) throw err;
    let promises = [];
    body.authors.forEach(authorId => {
      promises.push(addAuthorBook(authorId, results.insertId));
    });

    Promise.all(promises).then(_ => {
      return res.json({status: "success", message: "Book added successfully!!!"});
    })
  })
});

/* PUT books listing. */
router.put('/:bookId', function (req, res, next) {
  let body = req.body,  bookId = req.params.bookId;
  var query = `UPDATE book SET title = '${body.title}', edition_date ='${body.editionDate}' WHERE book.book_id = '${bookId}'`;
  testDB.query(query, function (err, results) {
    if (err) throw err
    deleteAuthorBookByBookId(bookId).then(_=>{
      let promises = [];
      body.authors.forEach(authorId => {
        promises.push(addAuthorBook(authorId, bookId));
      });
      Promise.all(promises).then(_ => {
        return res.json({status: "success", message: "Book updated successfully!!!"})
      })
    })
  })
});


function getAuthorBook(bookId) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM author_book where book_id = '${bookId}'`;
    testDB.query(query, (err, results) => {
      if (err) {
        reject(err)
      } else {
        let res =[];
        results.forEach( _=>{
          res.push(_.author_id)
        });
        resolve(res);
      }
    })
  });
}


function addAuthorBook(authorID, bookId) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO author_book (     
    author_id, 
    book_id) 
    VALUES ('${authorID}', '${bookId}')`;
    testDB.query(query, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    })
  });
}

function deleteAuthorBookByBookId(bookId) {
  return new Promise((resolve, reject) => {
    let query = `DELETE FROM author_book WHERE book_id= '${bookId}'`;
    testDB.query(query, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results);
      }
    })
  });
}

module.exports = router;
