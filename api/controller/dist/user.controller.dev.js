"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var User = require("../../models/user.model");

var Order = require("../../models/order.model");

var md5 = require('md5');

var moment = require('moment');

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          User.find().then(function (users) {
            res.json(users);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.deleteUser = function _callee2(req, res) {
  var idDelete;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          idDelete = req.params.id;
          console.log(idDelete);
          User.find({
            _id: idDelete
          }).then(function (item) {
            res.json(item);
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.postCreate = function (req, res, next) {
  var requestBody = req.body;
  requestBody.password = md5(req.body.password);
  requestBody.DOB = moment(req.body.DOB).format();
  requestBody.avatar = req.file.path.split("/").slice(1).join("/");
  User.create(req.body);

  if (res.statusCode === 200) {
    res.redirect('/admin/store-information');
  } else {
    res.json(res.statusCode);
  }
};

module.exports.postCreateRecord = function (req, res, next) {
  var userName = req.params.id;
  var result = req.body;
  result.Store === "" ? result.Store = userName : result.Store;
  result.timeOrder = moment(req.body.timeOrder).format("YYYY-MM-DDTHH:MM:ss");
  Order.find({
    Store: userName
  }).lean().then(function (userAccount) {
    var orderProduct = _objectSpread({}, userAccount, {}, result, {}, {
      Store: result.Store == undefined ? userName : result.Store
    });

    Order.create(orderProduct);
    return res.redirect("/users/".concat(userName));
  });
};

module.exports.getUser = function (req, res) {
  var id = req.params.id;
  User.find({
    "_id": id
  }).then(function (users) {
    res.render('users/view', {
      user: user
    });
  });
};

module.exports.editOrder = function (req, res) {
  var id = req.params.id;
  var result = req.body;
  var currentUserId = Buffer.from(req.cookies.type, 'base64').toString('ascii');
  result.timeOrder = moment(req.body.timeOrder).format("YYYY-MM-DDTHH:MM:ss");
  Order.updateOne({
    _id: id
  }, result, {
    upsert: true
  }).then(function (order) {
    console.log("Successfully");
    return res.redirect("/users/record/".concat(currentUserId.slice(5)));
  });
};