const path = require("path")

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")

const feedRoutes = require("./routes/feed")
const authRoutes = require("./routes/auth")

const app = express()

const fileStrorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images")
  },
  filename: function(req, file, cb) {
    cb(null, uuidv4())
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  multer({ storage: fileStrorage, fileFilter: fileFilter }).single("image")
)
app.use("/images", express.static(path.join(__dirname, "images")))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

app.use("/feed", feedRoutes)
app.use("/auth", authRoutes)

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  const data = error.data
  res.status(status).json({ message: message, data: data })
})

mongoose
  .connect("mongodb+srv://system:1234@cluster0.hfg277q.mongodb.net/messages")
  .then((result) => {
    app.listen(8080)
  })
  .catch((err) => console.log(err))
