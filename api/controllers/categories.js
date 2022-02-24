const Category = require('../models/categories');

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Category.findAll();
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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
    };

    try {
      const user = await Category.create(USER_MODEL);
      console.log('Category crerated');
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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
