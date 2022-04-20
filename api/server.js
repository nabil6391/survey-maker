const cors = require('express');

const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sequelize = require('./util/database');
const User = require('./models/users');

const app = express();
app.use(cors());

// Before the real request is done, first respond to the OPTIONS request (it's a HTTP method).
// Send back the Access-Control-Allow-Origin to confirm that the request is safe to send.
// Apply this request on everything.
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Access-Control-Allow-Methods', "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})

app.use('/api/dev', require('./routes/dev'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/categories', require('./routes/categories'));
app.use('/api/v1/subcategories', require('./routes/subcategories'));
app.use('/api/v1/surveys', require('./routes/surveys'));
app.use('/api/v1/questions', require('./routes/questions'));
app.use('/api/v1/responses', require('./routes/responses'));
app.use('/api/v1/demographics', require('./routes/demographics'));

const Demographic = require('./models/demographics');
const Response = require('./models/responses');
const Question = require('./models/questions');
const Survey = require('./models/surveys');
const Category = require('./models/categories');
const SubCategory = require('./models/subcategories');
const { Op } = require('sequelize');

Response.belongsTo(Question, { onDelete: 'cascade' })
SubCategory.belongsTo(Category, { onDelete: 'cascade' })
Category.belongsTo(Survey, { onDelete: 'cascade' })
Question.belongsTo(Survey, { onDelete: 'cascade' })
Question.belongsTo(SubCategory, { onDelete: 'cascade' })
Question.belongsTo(Category, { onDelete: 'cascade' })

app.get("/api/v1/stats/:id", async (req, res, next) => {
  try {
    var surveyId = req.params.id

    const options = {
      where: {},
      include: [
        {
          model: Question,
        }
      ]
    };

    if (req.query.surveyId)
      options.where.surveyId = req.query.surveyId

    const user = await Response.findAll(options);

    console.log(user)

    const ALL = await Demographic.findAll({
      where: req.query.surveyId
    });
    console.log(ALL)

    return res.status(201).json(user);
    return res.status(200).json(ALL);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
});

app.post("/api/v1/stats/:id", async (req, res, next) => {
  try {
    var surveyId = req.params.id

    console.log("Posting");
    try {
      const USER_MODEL = req.body.userData

      console.log(USER_MODEL);

      const userDemo = await Demographic.create(USER_MODEL);

      console.log('Demographic created');
      console.log(userDemo);

      var userId = USER_MODEL["userId"]
      console.log(userId)
      const responses = Object.entries(req.body.userData.responses).map(([e, v]) => {
        var USER_MODEL = {
          surveyId: surveyId,
          questionId: e,
          userId: userId,
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
});

const mySecret = process.env.JWT_SECRET;

function withAuth(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies != undefined && req.cookies.jwt != undefined) {
    token = req.cookies.jwt;
  }

  if (!token) {
    console.log("returning")
    return res
      .status(401)
      .json({ error: true, code: 'token.invalid', message: 'Token not present.' })
  }

  try {
    const decoded = jwt.verify(token, mySecret);
    req.user = decoded;

    return next();
  } catch (err) {
    console.log(err)
    return res
      .status(401)
      .json({ error: true, code: 'token.expired', message: 'Token invalid.' })
  }
}

//Register new User
app.post("/register", async (req, res) => {
  try {

    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(403).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    user = new User({
      username: req.body.email,
      email: req.body.email,
      password: hashedpass,
    });

    const newuser = await user.save();
    const { password, ...data } = await newuser.toJSON();

    return res.send(data);
  } catch (e) {
    console.log(e);
    return res.status(404).send({ message: "Something went wrong" });
  }
});

//Login User
app.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "wrong credencials" });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ message: "wrong credencials" });
    }

    const tokeni = jwt.sign(
      { _id: user.id, name: user.name, email: user.email },
      mySecret
    );

    res.cookie("jwt", tokeni, { httpOnly: true, maxAge: 24 * 24 * 60 * 60 * 1000 });

    const { password, ...data } = await user.toJSON();

    res.send(tokeni);
  } catch (err) {
    console.log(err)
    return res.status(404).send({ message: "Something went wrong" });
  }
});

//Authenticate User
app.get("/user", withAuth, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.user.email } });
    const { password, ...data } = await user.toJSON();
    return res.json(data);
  } catch (err) {
    console.log(err)
    return res.status(404).send({ message: "Something went wrong" });
  }
});

//Deauthenticate user
app.post("/logout", (req, res, next) => {
  res.cookie("jwt", " ", { maxAge: 0 });
  res.send({ message: "success" });
});

(async () => {
  try {
    await sequelize.sync();
    console.log("sync startd");
    app.listen(process.env.EXTERNAL_PORT || 3080);
  } catch (error) {
    console.error(error);
  }
})()