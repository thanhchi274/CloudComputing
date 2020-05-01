"use strict";

var User = require("../models/user.model");

var Order = require("../models/order.model");

var md5 = require('md5');

module.exports.index = function (req, res) {
  var base64Check = Buffer.from(req.cookies.type, 'base64').toString('ascii');
  var permission = base64Check.slice(0, 5).toString();
  var adminName = base64Check.slice(5).toString();

  if (permission === "Admin") {
    User.find({
      name: adminName
    }).then(function (users) {
      Order.find({}).then(function (items) {
        res.render('Layout/admin', {
          users: users,
          userAdmin: permission,
          adminName: adminName,
          record: items
        });
      });
    });
  } else {
    res.redirect('/users');
  }
};

module.exports.storeInformation = function (req, res) {
  User.find({}).then(function (users) {
    res.render('Admin/viewAllUser', {
      users: users
    });
  });
};

module.exports.searchUser = function _callee(req, res) {
  var q;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          q = req.query.q.toLowerCase();
          User.find({
            'name': q
          }).then(function (user) {
            res.render('Admin/viewAllUser', {
              users: user
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.searchRecord = function _callee2(req, res) {
  var q;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          q = req.query.q.toLowerCase();
          Order.find({
            'product': q
          }).then(function (record) {
            res.render('Admin/detailUser', {
              user: record
            });
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.createUser = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render('Admin/createUser');

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.getDetailUser = function _callee4(req, res) {
  var idStore;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          idStore = req.params.id;
          console.log(idStore);
          Order.find({
            Store: idStore
          }).then(function (store) {
            res.render('Admin/detailUser', {
              user: store
            });
          });

        case 3:
        case "end":
          return _context4.stop();
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

module.exports.create = function (req, res) {
  res.render('Order/order');
};

module.exports.deleteUser = function _callee5(req, res) {
  var idDelete;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          idDelete = req.params.id;
          User.findByIdAndDelete({
            _id: idDelete
          }).then(function (item) {
            res.redirect('/admin/store-information');
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.analyze = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          Order.find({}).then(function (item) {
            var countTotalNumber = 0;
            item.map(function (number) {
              countTotalNumber += parseInt(number.number);
            });
            res.render('Admin/analyze', {
              items: item,
              totalNumber: countTotalNumber
            });
          });

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports.analyzeAscending = function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          Order.find({}).then(function (item) {
            var countTotalNumber = 0;
            item.map(function (number) {
              countTotalNumber += parseInt(number.number);
            });
            item.sort(function (a, b) {
              return new Date(b.timeOrder) - new Date(a.timeOrder);
            });
            res.render('Admin/analyze', {
              items: item,
              totalNumber: countTotalNumber
            });
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

module.exports.analyzeDescending = function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          Order.find({}).then(function (item) {
            var countTotalNumber = 0;
            item.map(function (number) {
              countTotalNumber += parseInt(number.number);
            });
            item.sort(function (a, b) {
              return new Date(a.timeOrder) - new Date(b.timeOrder);
            });
            res.render('Admin/analyze', {
              items: item,
              totalNumber: countTotalNumber
            });
          });

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};