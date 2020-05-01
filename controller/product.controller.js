const Product = require("../models/product.model");   
module.exports.index = async function(req, res) {
  Product.find().then(function(products) {
    res.render('products/index',{products: products})
  })
};