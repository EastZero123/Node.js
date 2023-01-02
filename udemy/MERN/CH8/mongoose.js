const mongoose = require("mongoose")

const Product = require("./models/product")

mongoose
  .connect(
    "mongodb+srv://system:1234@cluster0.hfg277q.mongodb.net/products_test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected")
  })
  .catch(() => {
    console.log("Connect Failed")
  })

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  })
  const result = await createdProduct.save()

  res.json(result)
}

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec()
  res.json(products)
}

exports.createProduct = createProduct
exports.getProducts = getProducts
