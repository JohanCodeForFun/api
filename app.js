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

app.get("/books", async(req, res) => {
  try {
    const allBooks = await pool.query('SELECT * FROM library')
    res.json(allBooks.rows)
  } catch (err) {
    console.error(err)
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}!`);
});