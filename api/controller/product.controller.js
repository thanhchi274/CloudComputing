const Product = require("../../models/product.model");   
module.exports.index = async function(req, res) {
  Product.find().then(function(products) {
    res.json(products)
  })
};
module.exports.create = async function(req, res) {
  var product = await Product.create(req.body)
  res.json(product);
};
module.exports.deleteProduct = async function(req, res) {
  var product = await Product.findOneAndRemove(req.body)
  res.json(product);
};
// module.exports.updateProduct = async function(req, res) {
//   var product = await Product.findOneAndRemove(req.body)
//   res.json(product);
// };
