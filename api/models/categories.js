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
  }
});

module.exports = Category;