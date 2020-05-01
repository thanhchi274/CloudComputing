"use strict";

var express = require('express');

var router = express.Router();

var controller = require('../controller/product.controller');

router.get('/', controller.index);
router.post('/', controller.create);
router["delete"]('/', controller.deleteProduct);
module.exports = router;