"use strict";

var Order = require("../models/order.model");

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Order.find().then(function (users) {
            res.render('users/view/', {
              users: users
            });
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};