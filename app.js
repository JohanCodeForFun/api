const express = require("express");
const app = express();
const cors = require('cors');

const port = 3001;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const libraryRouter = require('./routes/library')
app.use('/library', libraryRouter)

app.listen(port, () => {
  console.log(`API listening on port ${port}!`);
});