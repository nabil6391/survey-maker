const Demographic = require('../models/demographics');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const options = {
      where: {},
    };

    if (req.query.surveyId)
      options.where.surveyId = req.query.surveyId

    const ALL = await Demographic.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Demographic.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      userId: req.body.userId,
      surveyId: req.body.surveyId,
      gender: req.body.gender,
      age: req.body.age,
      maritalStatus: req.body.maritalStatus,
      qualification: req.body.qualification,
      rank: req.body.rank,
      service: req.body.service,
      dutyArea: req.body.dutyArea,
      locationDuty: req.body.locationDuty,
      serviceYear: req.body.serviceYear,
      accomodation: req.body.accomodation,
    };

    const user = await Demographic.create(USER_MODEL);
    console.log('Demographic crerated');
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      userId: req.body.userId,
      surveyId: req.body.surveyId,
      gender: req.body.gender,
      age: req.body.age,
      maritalStatus: req.body.maritalStatus,
      qualification: req.body.qualification,
      rank: req.body.rank,
      service: req.body.service,
      dutyArea: req.body.dutyArea,
      locationDuty: req.body.locationDuty,
      serviceYear: req.body.serviceYear,
      accomodation: req.body.accomodation,
    };

    try {
      const user = await Demographic.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Demographic.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};