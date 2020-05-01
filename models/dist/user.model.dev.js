"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  type: String,
  DOB: String,
  avatar: String,
  versionKey: false,
  record: {
    result: {
      product: String,
      timeOrder: String,
      number: String
    }
  }
});
var User = mongoose.model('User', userSchema, "User");
module.exports = User;