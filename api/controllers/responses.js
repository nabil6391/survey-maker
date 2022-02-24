const Response = require('../models/responses');

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Response.findAll();
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
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      responseValue: {
        type: Sequelize.STRING,
        allowNull: false,
      }
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

// export async function getResponsesByQuestionId(id: number) {
//   const responses = await sql<Response[]>`
//   SELECT*from responses WHERE question_id = ${id}
//   ;`;
//   return responses.map((response: Response) => camelcaseKeys(response));
// }
