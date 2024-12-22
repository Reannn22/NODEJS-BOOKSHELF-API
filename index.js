const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Selamat datang di API Bookshelf');
});

let books = [
  { id: '1', title: 'Buku Tere Liye', author: 'Tere Liye' }
];

app.post('/books', (req, res) => {
    const book = req.body;
    console.log('Buku diterima:', book);
    books.push(book);
    res.status(201).send(book);
});

app.get('/books', (req, res) => {
    res.status(200).send(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.status(200).send(book);
    } else {
        res.status(404).send({ message: 'Buku tidak ditemukan' });
    }
});

app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        books[index] = req.body;
        res.status(200).send(books[index]);
    } else {
        res.status(404).send({ message: 'Buku tidak ditemukan' });
    }
});

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        const deletedBook = books.splice(index, 1);
        res.status(200).send(deletedBook);
    } else {
        res.status(404).send({ message: 'Buku tidak ditemukan' });
    }
});

app.listen(port, () => {
    console.log(`API Bookshelf berjalan di port ${port}`);
});
