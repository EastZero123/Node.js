const express = require("express")
const app = express()

app.get("/test/:params", function (req, res) {
  console.log(req.params)
})

app.listen(3000, () => console.log("http://localhost:3000"))
