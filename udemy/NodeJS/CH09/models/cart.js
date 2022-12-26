const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // constructor() {
  //     this.products = [];
  //     this.totalPrice = 0;
  // }

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {});
    });
  }

  static deleteProduct(id, productPrices) {
    fs.readFile(p, (err, FileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(FileContent) };
      const product = updatedCart.products.findIndex((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrices * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {});
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, FileContent) => {
      const cart = JSON.parse(FileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
