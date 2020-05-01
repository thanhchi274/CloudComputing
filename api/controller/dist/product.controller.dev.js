"use strict";

var Product = require("../../models/product.model");

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Product.find().then(function (products) {
            res.json(products);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.create = function _callee2(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Product.create(req.body));

        case 2:
          product = _context2.sent;
          res.json(product);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.deleteProduct = function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findOneAndRemove(req.body));

        case 2:
          product = _context3.sent;
          res.json(product);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // module.exports.updateProduct = async function(req, res) {
//   var product = await Product.findOneAndRemove(req.body)
//   res.json(product);
// };