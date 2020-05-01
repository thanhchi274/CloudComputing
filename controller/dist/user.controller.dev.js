"use strict";

var User = require("../models/user.model");

var Order = require("../models/order.model");

var md5 = require('md5');

module.exports.index = function (req, res) {
  var redirectCheck = Buffer.from(req.cookies.type, 'base64').toString('ascii');
  User.find({
    type: "Store"
  }).then(function (users) {
    res.render('users/index', {
      users: users,
      idCookie: redirectCheck.slice(5)
    });
  });
};

module.exports.searchRecord = function _callee(req, res) {
  var q;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          q = req.query.q.toLowerCase();
          Order.find({
            'product': q
          }).then(function (record) {
            res.render('users/userOrder', {
              users: record
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.postCreate = function (req, res, next) {
  var requestBody = req.body;
  requestBody.password = md5(req.body.password);
  requestBody.avatar = req.file.path.split("/").slice(1).join("/");
  User.create(req.body);
  res.redirect('/users');
};

module.exports.createOrder = function (req, res) {
  res.render('users/createOrder', {
    userName: req.params.id
  });
};

module.exports.userRecord = function (req, res) {
  var id = req.params.id;
  Order.find({
    Store: id
  }).lean().then(function (item) {
    res.render('users/userOrder', {
      users: item
    });
  });
};

module.exports.editOrder = function (req, res) {
  var id = req.params.id;
  Order.find({
    _id: id
  }).lean().then(function (item) {
    res.render('users/editOrder', {
      users: item
    });
  });
};

module.exports.getUser = function (req, res) {
  var userName = req.params.id;
  Order.find({
    Store: userName
  }).lean().then(function (userAccount) {
    res.render('users/view', {
      users: userAccount,
      store: userName
    });
  });
};

module.exports.searchUser = function (req, res) {
  var q = req.query.q.toLowerCase();
  User.find({
    'name': q
  }).then(function (result) {
    res.render('users/index', {
      users: result
    });
  });
};