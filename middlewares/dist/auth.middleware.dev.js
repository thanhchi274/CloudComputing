"use strict";

var User = require("../models/user.model");

module.exports.requireAuth = function (req, res, next) {
  if (!req.signedCookies.userID) {
    res.redirect('/auth/login');
    return;
  }

  User.find({
    _id: req.signedCookies.userID
  }).then(function (user) {
    if (!user) {
      res.redirect('auth/login');
      return;
    }

    res.locals.user = user;
    next();
  });
};