const Sequelize = require('sequelize');
const db = require('../util/database');

const Category = db.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  surveyId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  titleMy: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  descMy: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  itemOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Category;