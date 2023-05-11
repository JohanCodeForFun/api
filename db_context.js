// load .env for secret password
require("dotenv").config();
const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgres://postgres:${process.env.password}@localhost:5432/library-system`)

const bookModel = require('./models/bookModel')

// get all books in catalogue
async function selectAllBooks() {
  let bookData = await db.many("SELECT * FROM catalogue");
  console.log(bookData)
  return bookData;
}

// insert one book to catalogue
async function insertBook(author, title, genre, published, quantity, res) {
  const newBook = new bookModel(author, title, genre, published, quantity)
  console.log('new book: ', newBook)

  try {
    await db.none(
      "INSERT INTO catalogue (author, title, genre, published, quantity)" +
        "VALUES ($1, $2, $3, $4, $5)",
      [newBook.author, newBook.title, newBook.genre, newBook.published, newBook.quantity]
    );

    res.status(200).send('Book succesfully added.');
  } catch (err) {
    console.error(err)
  }
}

// update one specific book
async function updateBook(bookId, author, title, genre, published, quantity, res) {
  try {
    await db.none(
      "UPDATE catalogue SET author = $2, title = $3, genre = $4, published = $5, quantity = $6 WHERE book_id = $1",
      [bookId, author, title, genre, published, quantity]
    );

    res.status(200).send('Succesfully updated book.')
  } catch (err) {
    console.error(err)
  }
}

// delete a book
async function deleteBook(bookId, res) {
  try {
  await db.none("DELETE FROM catalogue WHERE book_id = $1", [bookId]);
    
  res.status(200).send('Succesfully deleted book.')
  } catch (err) {
    console.error(err)
  }
}

// search books
async function selectBookByAuthor(keyword) {
  let bookData = await db.any(
    `SELECT * FROM catalogue WHERE author LIKE '${keyword}%'`
  );

  return bookData;
}
async function selectBookByTitle(keyword) {
  let bookData = await db.any(
    `SELECT * FROM catalogue WHERE title LIKE '${keyword}%'`
  );

  return bookData;
}

module.exports = {
  selectAllBooks,
  selectBookByAuthor,
  selectBookByTitle,
  insertBook,
  updateBook,
  deleteBook
};
