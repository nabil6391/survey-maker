const Survey = require('../models/surveys');

exports.getAll = async (req, res, next) => {
  const options = {
    where: {},
  };

  if (req.query.slug)
    options.where.slug = req.query.slug

  try {
    const ALL = await Survey.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Survey.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      userId: req.body.userId,
      title: req.body.title,
      slug: req.body.slug,
      title_my: req.body.title
    };

    try {
      const user = await Survey.create(USER_MODEL);
      console.log('Survey crerated');
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
      userId: req.body.username,
      title: req.body.title,
      slug: req.body.slug,
      title_my: req.body.title
    };

    try {
      const user = await Survey.update(USER_MODEL, { where: { userId: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Survey.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getByUserId = async (req, res, next) => {
  try {
    const user = await Survey.findAll({ where: { userId: req.params.userId } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getBySlug = async (req, res, next) => {
  try {
    const user = await Survey.find({ where: { slug: req.params.slug } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
