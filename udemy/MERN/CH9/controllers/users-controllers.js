const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// const DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Max Schwarz",
//     email: "test@test.com",
//     password: "testers",
//   },
// ]

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    console.log(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const Error = new HttpError("sign up fail", 500);
    return next(Error);
  }
  if (existingUser) {
    const error = new HttpError("User exist", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: "",
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    const Error = new HttpError("Create Fail", 500);
    return next(Error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    const Error = new HttpError("login fail", 500);
    return next(Error);
  }
  if (existingUser) {
    const error = new HttpError("User exist", 422);
    return next(error);
  }

  if (existingUser || existingUser.password !== password) {
    const Error = new HttpError("Invalid fail", 401);
    return next(Error);
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
