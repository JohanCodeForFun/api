// load .env for secret password
require("dotenv").config();
const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgres://postgres:${process.env.password}@localhost:5432/library-system`)

const bookModel = require('./models/bookModel')

// get all books in library
async function selectAllBooks() {
  let bookData = await db.many("SELECT * FROM library");

  return bookData;
}

// insert one book to library
async function insertBook(author, title, genre, published, res) {
  const newBook = new bookModel(author, title, genre, published)
  console.log('new book: ', newBook)

  try {
    await db.none(
      "INSERT INTO library (author, title, genre, published)" +
        "VALUES ($1, $2, $3, $4)",
      [newBook.author, newBook.title, newBook.genre, newBook.published]
    );

    res.status(200).send('Book succesfully added.');
  } catch (err) {
    console.error(err)
  }
}

// update one specific book
async function updateBook(bookId, author, title, genre, published, res) {
  try {
    await db.none(
      "UPDATE library SET author = $2, title = $3, genre = $4, published = $5 WHERE book_id = $1",
      [bookId, author, title, genre, published]
    );

    res.status(200).send('Succesfully updated book.')
  } catch (err) {
    console.error(err)
  }
}

// delete a book
async function deleteBook(bookId, res) {
  try {
  await db.none("DELETE FROM library WHERE book_id = $1", [bookId]);
    
  res.status(200).send('Succesfully deleted book.')
  } catch (err) {
    console.error(err)
  }
}

// search books
async function selectBookByKeyword(keyword) {
  let bookData = await db.any(
    `SELECT * FROM library WHERE title LIKE '${keyword}%'`
  );

  return bookData;
}

module.exports = {
  selectAllBooks,
  selectBookByKeyword,
  insertBook,
  updateBook,
  deleteBook
};
