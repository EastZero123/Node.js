const { validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })

const HttpError = require("../models/http-error")
const User = require("../models/user")

const getUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find({}, "-password")
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    )
    return next(error)
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) })
}

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    )
  }
  const { name, email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    )
    return next(error)
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    )
    return next(error)
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    const error = new HttpError("비밀번호 암호화 오류", 500)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  })

  try {
    await createdUser.save()
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    )
    return next(error)
  }

  let token
  try {
    token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    )
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    )
    return next(error)
  }

  res
    .status(201)
    .json({ userId: createdUser._id, email: createdUser.email, token: token }) // createdUser includes the PW
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError("Login in failed, please try again later.", 500)
    return next(error)
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    )
    return next(error)
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    const error = new HttpError("로그인 실패", 500)
    return next(error)
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    )
    return next(error)
  }

  let token
  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.MONGO_URI,
      { expiresIn: "1h" }
    )
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    )
    return next(error)
  }

  res.json({
    userId: existingUser._id,
    email: existingUser.email,
    token: token,
  })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
