const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('we are at the wiki homepage');
});

router.post('/', (req, res) => {
  res.send('we are posting the wiki homepage');
});

router.get('/add', (req, res) => {
  res.send('form data goess here');
});

module.exports = {
  router,
};
