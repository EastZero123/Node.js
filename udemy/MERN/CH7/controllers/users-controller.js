const { v4: uuidv4 } = require("uuid")
const { validationResult } = require("express-validator")

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Choi Dong Young",
    email: "test@test.com",
    password: "1234",
  },
]

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS })
}

const signup = (req, res, next) => {
  const { name, email, password } = req.body

  const hasUser = DUMMY_USERS.find((u) => u.email === email)
  if (hasUser) {
    throw new HttpError("Already Email", 404)
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  }

  DUMMY_USERS.push(createdUser)

  res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {
  const { email, password } = req.body

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email)
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Not Found User", 401)
  }

  res.json({ message: "Logged In" })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
