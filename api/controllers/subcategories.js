const Subcategory = require('../models/subcategories');

exports.getAll = async (req, res, next) => {
  try {
    const options = {
      where: {},
    };

    if (req.query.surveyId)
      options.where.surveyId = req.query.surveyId

    if (req.query.categoryId)
      options.where.categoryId = req.query.categoryId

    const ALL = await Subcategory.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Subcategory.findByPk(req.params.id);
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
      title: req.body.title
    };

    try {
      const user = await Subcategory.create(USER_MODEL);
      console.log('Subcategory crerated');
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
      categoryId: req.body.categoryId,
      title: req.body.title
    };

    try {
      const user = await Subcategory.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Subcategory.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
