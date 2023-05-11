const bookModel = require("../models/bookModel");
const db_context = require("../db_context");

async function getAllBooks() {
  let books = [];
  let bookData = await db_context.selectAllBooks();

  bookData.forEach((book) => {
    books.push(
      new bookModel(
        book.author,
        book.title,
        book.genre,
        book.published,
        book.quantity
      )
    );
  });

  return books;
}

async function getBookByKeyword(keyword) {
  let books = [];
  let bookData = await db_context.selectBookByKeyword(keyword);

  bookData.forEach((book) => {
    books.push(
      new bookModel(
        book.author,
        book.title,
        book.genre,
        book.published,
        book.quantity
      )
    );
  });

  return books;
}

async function addBook(author, title, genre, published, quantity) {
  db_context.insertBook(author, title, genre, published, quantity);
}

async function editBook(bookId, author, title, genre, published, quantity) {
  db_context.updateBook(bookId, author, title, genre, published, quantity);
}

async function deleteBook(book_Id) {
  db_context.deleteBook(book_Id);
}

module.exports = {
  getAllBooks,
  getBookByKeyword,
  addBook,
  editBook,
  deleteBook,
};
