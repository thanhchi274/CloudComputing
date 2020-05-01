const express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/upload/' })
const router = express.Router();
const controller = require("../controller/user.controller")
const validate = require("../../validate/user.validate")
router.get('/', controller.index)
router.post('/createOrder/:id',controller.postCreateRecord)
router.get('/:id',controller.getUser)
router.post('/record/edit/:id',controller.editOrder)
router.post('/create',upload.single('avatar'),validate.postCreate,controller.postCreate)
router.get('/deleteUser/:id', controller.deleteUser)
module.exports = router