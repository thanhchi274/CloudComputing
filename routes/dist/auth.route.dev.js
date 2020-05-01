"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../controller/auth.controller");

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/logout', controller.logOut);
module.exports = router;