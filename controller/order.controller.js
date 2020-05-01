const Order = require("../models/order.model");   
module.exports.index = async function(req, res) {
    Order.find().then(function(users) {
    res.render('users/view/',{users: users})
  })
};