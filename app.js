const express = require("express");
const app = express();
const cors = require('cors');

const port = 3001;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const catalogueRouter = require('./routes/catalogue')
app.use('/catalogue', catalogueRouter)

app.listen(port, () => {
  console.log(`API listening on port ${port}!`);
});