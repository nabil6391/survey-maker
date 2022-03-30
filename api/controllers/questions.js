const Question = require('../models/questions');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const options = {
      where: {},
      order: [
        ['itemOrder', 'ASC'],
      ],
    };

    if (req.query.surveyId)
      options.where.surveyId = req.query.surveyId

    if (req.query.categoryId)
      options.where.categoryId = req.query.categoryId

    if (req.query.subcategoryId)
      options.where.subcategoryId = req.query.subcategoryId

    const ALL = await Question.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Question.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      surveyId: req.body.surveyId,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      itemOrder: req.body.order,
      title: req.body.title,
      titleMy: req.body.titleMy,
    };

    const user = await Question.create(USER_MODEL);
    console.log('Question crerated');
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      surveyId: req.body.surveyId,
      categoryId: req.body.categoryId,
      subcategoryId: req.body.subcategoryId,
      itemOrder: req.body.order,
      title: req.body.title,
      titleMy: req.body.titleMy,
    };

    try {
      const user = await Question.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Question.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};