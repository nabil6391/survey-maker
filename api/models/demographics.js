const Sequelize = require('sequelize');
const db = require('../util/database');

const Demographic = db.define('demographics', {
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
  gender: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maritalStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qualification: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  service: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dutyArea: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  locationDuty: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  serviceYear: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accomodation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Demographic;