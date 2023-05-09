const express = require('express');
const router = express.Router();
const pool = require('../db_context');
// const controller = require('../controllers/libraryControllers')

// insert one book to library
router.post('/books', async(req, res) => {
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
router.get("/all", async(req, res) => {
  try {
    const allBooks = await pool.query('SELECT * FROM library')
    res.json(allBooks.rows)
  } catch (err) {
    console.error(err)
  }
});

// get one specific book from library
router.get('/books/:id', async(req, res) => {
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
router.put('/books/:id', async(req, res) => {
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
router.delete('/books/:id', async(req, res) => {
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


module.exports = router