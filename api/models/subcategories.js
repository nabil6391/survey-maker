const Sequelize = require('sequelize');
const db = require('../util/database');

const Subcategory = db.define('subcategories', {
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
  categoryId: {
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
  itemOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = Subcategory;