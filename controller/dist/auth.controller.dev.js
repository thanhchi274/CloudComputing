"use strict";

var User = require("../models/user.model");

var md5 = require('md5');

module.exports.login = function (req, res) {
  return res.render('auth/login');
};

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
            if (user.length === 0) {
              res.render('auth/login', {
                errors: ['Check again username and password '],
                values: req.body
              });
            }
          });
          User.find({
            name: name,
            password: password
          }).lean().then(function (userAccount) {
            userAccount.forEach(function (userAccount) {
              res.cookie('userID', userAccount._id, {
                signed: true
              });
              var base64typeUserName = Buffer.from(userAccount.type + userAccount.name).toString('base64');
              res.cookie('type', base64typeUserName);
              var base64Check = Buffer.from(base64typeUserName, 'base64').toString('ascii');
              var redirectCheck = base64Check.slice(0, 5);
              var permission = redirectCheck.toString();
              permission === "Admin" ? res.redirect('/admin') : res.redirect('/users');
            });
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.logOut = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.clearCookie('userID');
          res.redirect('/');

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};