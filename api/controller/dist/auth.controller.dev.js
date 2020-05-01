"use strict";

var User = require("../../models/user.model");

var md5 = require('md5');

module.exports.postLogin = function _callee(req, res) {
  var name, password;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = req.body.name;
          password = md5(req.body.password);
          User.find({
            name: name,
            password: password
          }).then(function (user) {
            if (user === null || []) {
              res.json({
                errors: ['Check again username and password 1'],
                values: req.body
              });
              return;
            } else {
              res.json(user);
            }
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};