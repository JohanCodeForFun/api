module.exports = class book {
  constructor(author, title, genre, published, quantity, loaned, book_id) {
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.published = published;
    this.quantity = quantity;
    this.loaned = loaned;
    this.book_id = book_id;
  }
}