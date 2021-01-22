const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage.js');
const { Page, User } = require('../models/index.js');

router.get('/', (req, res) => {
  res.send('we are at the wiki homepage');
});

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const page = await Page.create({
      title,
      content,
    });
    // function slugilize(title) {
    //   return title.replace(/\s/g, '_').replace(/\W/g, '');
    // }
    // console.log(slugilize(title));
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

router.get('/add', (req, res) => {
  res.send(addPage());
});

module.exports = router;
