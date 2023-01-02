const MongoClient = require("mongodb").MongoClient

const url =
  "mongodb+srv://system:1234@cluster0.hfg277q.mongodb.net/products_test?retryWrites=true&w=majority"

const createProduct = async (req, res, next) => {
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
    return res.json({ message: "Could not store data." })
  }
  client.close()

  res.json(newProduct)
}

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url)

  let products

  try {
    await client.connect()
    const db = client.db()
    products = await db.collection("products").find().toArray()
    console.log(products)
  } catch (error) {
    return res.json({ message: "Not products" })
  }
  client.close()

  res.json(products)
}

exports.createProduct = createProduct
exports.getProducts = getProducts
