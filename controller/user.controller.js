const User = require("../models/user.model");   
const Order = require("../models/order.model")
const md5 = require('md5')
module.exports.index =(req, res) => {
    let redirectCheck = Buffer.from(req.cookies.type, 'base64').toString('ascii')
    User.find({type:"Store"}).then(function(users) {
        res.render('users/index',{users: users, idCookie : redirectCheck.slice(5)})
    })
};
module.exports.searchRecord =async (req,res)=>{
    let q = req.query.q.toLowerCase();
    Order.find({'product':q}).then(function(record) {
        res.render('users/userOrder',{
            users:record,
        })
    })
}
module.exports.postCreate = (req,res,next)=>{
    let requestBody = req.body
    requestBody.password = md5(req.body.password)
    requestBody.avatar  =req.file.path.split("/").slice(1).join("/");
    User.create(req.body)
    res.redirect('/users')
}
module.exports.createOrder = (req,res)=>{
    res.render('users/createOrder',{userName:req.params.id})
}
module.exports.userRecord = (req,res)=>{
    let id = req.params.id;
    Order.find({Store:id}).lean().then(function(item) {
        res.render('users/userOrder',{
            users:item,
        })})
}
module.exports.editOrder = (req,res)=>{
    let id = req.params.id;
    Order.find({_id:id}).lean().then(function(item) {
        res.render('users/editOrder',{
            users:item,
        })})
}
module.exports.getUser =(req,res)=>{
    let userName = req.params.id;
    Order.find({Store:userName}).lean().then(function(userAccount) {
        res.render('users/view',{
            users:userAccount,
            store:userName
        })})
}