const Category = require('../models/categories');

exports.getAll = async (req, res, next) => {
  const options = {
    where: {},
    order: [
      ['itemOrder', 'ASC'],
    ],
  };

  if (req.query.surveyId)
    options.where.surveyId = req.query.surveyId

  if (req.query.slug)
    options.where.slug = req.query.slug

  try {
    const ALL = await Category.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Category.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      surveyId: req.body.surveyId,
      title: req.body.title,
      titleMy: req.body.titleMy,
      desc: req.body.desc,
      descMy: req.body.descMy,
      itemOrder: req.body.order,
    };

    try {
      const user = await Category.create(USER_MODEL);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      surveyId: req.body.surveyId,
      title: req.body.title,
      titleMy: req.body.titleMy,
      desc: req.body.desc,
      descMy: req.body.descMy,
      itemOrder: req.body.order,
    };

    try {
      const user = await Category.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Category.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
