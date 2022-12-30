const MongoClient = require("mongodb").MongoClient

const url =
  "mongodb+srv://system:1234@cluster0.hfg277q.mongodb.net/products_test?retryWrites=true&w=majority"

const createProduct = async (req, res, next) => {
  console.log(req.body.name)
  console.log(req.body.price)
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  }
  const client = new MongoClient(url)

  try {
    await client.connect()
    const db = client.db()
    const result = db.collection("products").insertOne(newProduct)
  } catch (error) {
    return res.json({ message: "Connect Failed" })
  }
  //   client.close()

  res.json(newProduct)
}

const getProducts = async (req, res, next) => {}

exports.createProduct = createProduct
exports.getProducts = getProducts
