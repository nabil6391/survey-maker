const Sequelize = require('sequelize');
const db = require('../util/database');

const Response = db.define('responses', {
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
  userId: {
    type: Sequelize.UUID,
    allowNull: false
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