"use strict";

require('dotenv').config();

var express = require('express');

var app = express();
var port = 3000;

var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOHQ_URL, {
  useNewUrlParser: true
});

var userRoutes = require("./routes/user.route");

var adminRoutes = require("./routes/admin.route");

var productRoutes = require("./routes/product.route");

var authRoutes = require("./routes/auth.route");

var apiProductRoute = require("./api/routes/product.route");

var apiUserRoute = require("./api/routes/user.route");

var apiAuthRoute = require("./api/routes/auth.route");

var authMiddleware = require("./middlewares/auth.middleware");

app.locals.moment = require('moment');
app.use(express["static"]('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.set('view engine', 'pug');
app.set('views', './views');
app.use("/users", authMiddleware.requireAuth, userRoutes);
app.use("/admin", adminRoutes);
app.use("/products", authMiddleware.requireAuth, productRoutes);
app.use("/auth", authRoutes);
app.use('/api/products', apiProductRoute);
app.use("/api/users", apiUserRoute);
app.use("/api/auth", apiAuthRoute);
app.get('/', authMiddleware.requireAuth, function (req, res) {
  return res.render('index', {
    name: 'AAA'
  });
});
app.get('/contact', function (req, res) {
  return res.render('./contact/contact');
});
app.listen(port, function () {
  return console.log("app listening at http://localhost:".concat(port));
});