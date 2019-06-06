var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
  app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('books').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
app.post('/books', (req, res) => {
    const book = { text: req.body.body, title: req.body.title };
    db.collection('books').insert(book, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('books').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Книга с таким id= ' + id + ' удалена!');
      } 
    });
  });
 app.put ('/books/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const book = { text: req.body.body, title: req.body.title };
    db.collection('books').update(details, book, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(book);
      } 
    });
  });
};

