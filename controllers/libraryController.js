const book = require('../models/bookModel');
const { getAllBooks, addBook, getBookByKeyword, editBook, deleteBook } = require('../repositories/bookRepository');

async function get(req, res) {
  let bookData = await getAllBooks();

  return res.json(bookData);
};

async function search(req, res) {
  let bookData = await getBookByKeyword(req.query.keyword);

  console.log(bookData);

  return res.json(bookData);
};

async function add(req, res) {
  await addBook(req.body.author, req.body.title, req.body.genre, req.body.published);

  res.sendStatus(200);
};

async function edit(req, res) {
  await editBook(req.body.bookId, req.body.author, req.body.title, req.body.genre, req.body.published);

  res.sendStatus(200);
};

async function remove(req, res) {
  await deleteBook(req.body.bookId);
}

module.exports = {
  get,
  add,
  edit,
  search,
  remove
}