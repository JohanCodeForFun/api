const express = require('express');
const router = express.Router();
const controller = require('../controllers/catalogueController')

router.get('/all', async (req, res) => {
  await controller.get(req, res);
});

router.post('/search', async (req, res) => {
  console.log(req.body);
  await controller.search(req, res);
});

router.post('/add', async (req, res) => {
  await controller.add(req, res);
});

router.put('/edit', async (req, res) => {
  console.log(req.body);
  await controller.edit(req, res);
});

router.delete('/remove', async (req, res) => {
  await controller.remove(req, res);
  res.sendStatus(200);
});

module.exports = router