const Response = require('../models/responses');
const Demographic = require('../models/demographics');

exports.getAll = async (req, res, next) => {
  try {
    const options = {
      where: {},
    };

    if (req.query.surveyId)
      options.where.surveyId = req.query.surveyId

    if (req.query.categoryId)
      options.where.categoryId = req.query.categoryId

    if (req.query.categoryId)
      options.where.userId = req.query.userIds

    const ALL = await Response.findAll(options);
    return res.status(200).json(ALL);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await Response.findByPk(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const USER_MODEL = {
      questionId: req.body.questionId,
      userId: req.body.userId,
      responseValue: req.body.email,
    };

    try {
      const user = await Response.create(USER_MODEL);
      console.log('Response crerated');
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createAll = async (req, res, next) => {
  try {
    console.log(req.body);
    try {
      const USER_MODEL = req.body.userData

      const userDemo = await Demographic.create(USER_MODEL);
      console.log(USER_MODEL);

      console.log('Response crerated');
      console.log(userDemo);

      const responses = Object.entries(req.body.userData.responses).map(([e, v]) => {
        var USER_MODEL = {
          questionId: e,
          userId: 11,
          responseValue: v,
        }
        return USER_MODEL
      });

      console.log(responses)
      const user = await Response.bulkCreate(responses);
      console.log('Response crerated');
      console.log(user);
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
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
      const user = await Response.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const user = await Response.destroy({ where: { id: req.params.id } });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllBySurveyId = async (req, res, next) => {
  try {
    const user = await Response.findAll(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};