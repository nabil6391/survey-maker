const Question = require('../models/questions');

exports.getAll = async (req, res, next) => {
  try {
    const ALL = await Question.findAll();
    return res.status(200).json(ALL);
  } catch (error) {
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

    try {
      const user = await Question.create(USER_MODEL);
      console.log('Question crerated');
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
      const user = await Question.update(USER_MODEL, { where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) { }
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


// export async function getQuestionWhereSurveyIdIs(id: number) {
//   const questions = await sql<Question[]>`
//   SELECT*from questions WHERE survey_id = ${id}
//   ;`;
//   // return camelcaseKeys(questions);
//   return questions.map((question: Question) => camelcaseKeys(question));
// }