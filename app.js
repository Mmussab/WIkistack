const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout.js');
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const app = express();

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.use(morgan('dev'));
app.use(express.static('./frenchfries'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', function (req, res) {
  res.send(layout('hello world'));
});

const initalizedb = async () => {
  await Page.sync();
  await User.sync();

  app.listen(2101);
};

initalizedb();
