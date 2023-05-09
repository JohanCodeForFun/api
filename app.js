const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db_context');

const port = 3000;

// middleware
app.use(cors());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello Library lady!");
});

// insert one book to library
app.post('/books', async(req, res) => {
  try {
    const { author, title, genre, published } = req.body;
    const addBook = await pool.query(
      "INSERT INTO library (author, title, genre, published)" +
      "VALUES ($1, $2, $3, $4)",
      [
        author, title, genre, published
      ]
    )

    res.json('Succesfully added book to library!')
  } catch (err) {
    console.error(err)
  }
})

// get all books in library
app.get("/books", async(req, res) => {
  try {
    const allBooks = await pool.query('SELECT * FROM library')
    res.json(allBooks.rows)
  } catch (err) {
    console.error(err)
  }
});

// get one specific book from library
app.get('/books/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const book = await pool.query('SELECT * FROM library WHERE book_id = $1', [
      id
    ])

    res.json(book.rows[0])
  } catch (err) {
    console.error(err)
  }
})

// update one specific book
app.put('/books/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { author, title, genre, published } = req.body;
    const updateBook = await pool.query(
      "UPDATE library SET author = $2, title = $3, genre = $4, published = $5 WHERE book_id = $1",
      [
        id, author, title, genre, published
      ]
    )

    res.json('Succesfully updated book!')
  } catch (err) {
    console.error(err)
  }
})

// delete a book
app.delete('/books/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await pool.query(
      "DELETE FROM library WHERE book_i = $1", [
        id
      ]);
      res.json('Book was deleted!')
  } catch (err) {
    console.error(err)
  }
})

app.listen(port, () => {
  console.log(`API listening on port ${port}!`);
});