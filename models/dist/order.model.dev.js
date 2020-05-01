"use strict";

var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  product: String,
  timeOrder: String,
  number: String,
  Store: String,
  versionKey: false
});
var Order = mongoose.model('Order', orderSchema, "Order");
module.exports = Order;