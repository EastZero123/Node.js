const express = require("express")
const bodyParser = require("body-parser")
const mongoPractice = require("./mongoose")

const app = express()

// const jsonParser = bodyParser.json()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/products", mongoPractice.createProduct)
// app.post("/products", jsonParser, (req, res) => {
//   console.log(JSON.stringify(req.body))
// })

app.get("/products", mongoPractice.getProducts)

app.listen(3000)
