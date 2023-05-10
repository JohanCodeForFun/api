// load .env
require("dotenv").config();
const pgp = require('pg-promise')(/* options */)
const db = pgp(`postgres://postgres:${process.env.password}@localhost:5432/library-system`)

// get all books in library
async function selectAllBooks() {
  let bookData = await db.many("SELECT * FROM library");

  return bookData;
}

// insert one book to library
async function insertBook(author, title, genre, published) {
  await db.none(
    "INSERT INTO library (author, title, genre, published)" +
      "VALUES ($1, $2, $3, $4)",
    [author, title, genre, published]
  );
}

// update one specific book
async function updateBook(author, title, genre, published) {
  await db.none(
    "UPDATE library SET author = $2, title = $3, genre = $4, published = $5 WHERE book_id = $1",
    [id, author, title, genre, published]
  );
}

// delete a book
async function deleteBook(bookId) {
  await db.none("DELETE FROM library WHERE book_i = $1", [id]);
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
