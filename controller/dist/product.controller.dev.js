"use strict";

var Product = require("../models/product.model");

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Product.find().then(function (products) {
            res.render('products/index', {
              products: products
            });
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};