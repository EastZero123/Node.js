const jwt = require("jsonwebtoken")
const path = require("path")

const HttpError = require("../models/http-error")
require("dotenv").config({ path: path.join(__dirname, ".env") })

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      throw new Error("인증 실패")
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN)
    req.userData = { userId: decodedToken.userId }
    next()
  } catch (err) {
    const error = new HttpError("인증 실패", 401)
    return next(error)
  }
}
