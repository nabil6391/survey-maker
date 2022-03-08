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
app.use('/api/v1/responses', withAuth, require('./routes/responses'));

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

    console.log("req.user")
    console.log(req.user)
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
    console.log("user")
    console.log(req.user)
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
    await sequelize.sync(
      { force: true }
    );
    console.log("test");
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
})()