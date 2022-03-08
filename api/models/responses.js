const Sequelize = require('sequelize');
const db = require('../util/database');

const Response = db.define('responses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  responseValue: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Response;