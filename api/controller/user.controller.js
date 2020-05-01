const User = require("../../models/user.model");   
const Order = require("../../models/order.model");
const md5 = require('md5')
const moment = require('moment');
module.exports.index = async function(req, res) {
    User.find().then(function(users) {
      res.json(users)
    })
  };
module.exports.deleteUser =async function(req, res) {
  let idDelete = req.params.id
  console.log(idDelete)
  User.find({_id: idDelete}).then(function(item){
    res.json(item)
  })
}
  module.exports.postCreate = (req,res,next)=>{
    let requestBody = req.body
    requestBody.password = md5(req.body.password)
    requestBody.DOB = moment(req.body.DOB).format()
    requestBody.avatar =req.file.path.split("/").slice(1).join("/");
    User.create(req.body)
    if(res.statusCode===200){
      res.redirect('/admin/store-information')
    }
    else{
      res.json(res.statusCode)
    } 
}
module.exports.postCreateRecord = (req,res,next)=>{
  let userName = req.params.id;
  let result = req.body
  result.Store === ""? result.Store = userName : result.Store
  result.timeOrder = moment(req.body.timeOrder).format("YYYY-MM-DDTHH:MM:ss")
  Order.find({Store:userName}).lean().then(function(userAccount) {
    let orderProduct = {...userAccount,...result,...{Store:result.Store==undefined? userName: result.Store}}
    Order.create(orderProduct)
    return res.redirect(`/users/${userName}`)
    })}
module.exports.getUser =(req,res)=>{
    let id = req.params.id;
    User.find({"_id":id}).then(function(users) {
      res.render('users/view',{
        user:user
    });
    })
}
module.exports.editOrder = (req,res)=>{
  let id = req.params.id;
  let result = req.body
  let currentUserId = Buffer.from(req.cookies.type, 'base64').toString('ascii')
  result.timeOrder = moment(req.body.timeOrder).format("YYYY-MM-DDTHH:MM:ss")
  Order.updateOne({_id:id},result,{upsert: true}).then((order)=>{
    console.log("Successfully")
    return res.redirect(`/users/record/${currentUserId.slice(5)}`)
  })
}