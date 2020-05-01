const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/upload/' })
const router = express.Router();
const controller = require("../controller/user.controller")
const validate = require("../validate/user.validate")
router.get('/', controller.index)
router.get('/searchRecord',controller.searchRecord)
router.get('/record/create/:id',controller.createOrder)
router.get('/record/:id',controller.userRecord)
router.get('/record/edit/:id',controller.editOrder)
router.get('/:id',controller.getUser)
module.exports = router