const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const testFun = (req, res, next) => {
  res.json({ hello: 'World' });
};

/* ------------------------------- SIGNUP ------------------------------- */
const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { email, password, firstName, lastName, userName } = req.body;

  // Check if user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return next(new HttpError('signup failed, please try again later.', 500));
  }

  if (existingUser) {
    return next(
      new HttpError('User already exists, please login instead', 422)
    );
  }

  // encrypt password and create new user
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new Error('Could not create user please try again!', 500);
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
    friends: [],
    teams: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    return next(
      new HttpError('user created failed, please try again later.', 500)
    );
  }

  // Create token to send back to client.
  let token;
  console.log(createdUser);
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('user created failed, please try again later.', 500)
    );
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

/* ------------------------------- LOGIN ------------------------------- */
const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  // attempt to find user in database
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return next(new HttpError('login failed, please try again later.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, please try again', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, please try again', 403));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('logging in failed, please try again later.', 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token,
  });
};

exports.testFun = testFun;
exports.signup = signup;
exports.login = login;
