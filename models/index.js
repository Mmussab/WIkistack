const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
  },
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    isAlphanumeric: true,
    allowNull: false,

    // defaultValue: this.title.split(' ').join(''),
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['open', 'closed']],
    },
  },
});

Page.beforeValidate(function (page, options) {
  page.slug = page.title.replace(/\s/g, '_').replace(/\W/g, '');
});

module.exports = {
  db,
  User,
  Page,
};
