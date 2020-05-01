"use strict";

var express = require('express');

var router = express.Router();

var controller = require("../controller/admin.controller");

router.get('/', controller.index);
router.get('/store-information', controller.storeInformation);
router.get('/searchUser', controller.searchUser);
router.get('/user/view/:id', controller.getDetailUser);
router.get('/user/create', controller.createUser);
router.get('/searchRecord', controller.searchRecord);
router.get('/deleteUser/:id', controller.deleteUser);
router.get('/analyze', controller.analyze);
router.get('/analyze/ascending', controller.analyzeAscending);
router.get('/analyze/descending', controller.analyzeDescending);
module.exports = router;