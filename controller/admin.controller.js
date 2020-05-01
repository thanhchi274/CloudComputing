const User = require("../models/user.model");   
const Order = require("../models/order.model");   
const md5 = require('md5')
module.exports.index =(req, res) => {
    let base64Check = Buffer.from(req.cookies.type, 'base64').toString('ascii')
    let permission = base64Check.slice(0,5).toString()
    let adminName = base64Check.slice(5).toString()
    if (permission==="Admin"){
        User.find({name:adminName}).then(function(users) {
            Order.find({}).then(function(items){
                res.render('Layout/admin',{users: users, userAdmin:permission, adminName: adminName, record:items})
            })
        })
    }
    else{
        res.redirect('/users')
    }
};
module.exports.storeInformation = (req, res) => {
    User.find({}).then(users=>{
        res.render('Admin/viewAllUser', {users:users})
    })
}
module.exports.searchUser =async (req,res)=>{
    let q = req.query.q.toLowerCase();
    User.find({'name':q}).then(function(user) {
        res.render('Admin/viewAllUser',{
            users:user,
        })
    })
}
module.exports.searchRecord =async (req,res)=>{
    let q = req.query.q.toLowerCase();
    Order.find({'product':q}).then(function(record) {
        res.render('Admin/detailUser',{
            user:record,
        })
    })
}
module.exports.createUser = async (req,res) => {
    res.render('Admin/createUser')
}
module.exports.getDetailUser = async (req,res)=>{
    let idStore = req.params.id;
    console.log(idStore)
    Order.find({Store:idStore}).then(store=>{
        res.render('Admin/detailUser', {user:store})
    })
}
module.exports.postCreate = (req,res,next)=>{
    let requestBody = req.body
    requestBody.password = md5(req.body.password)
    requestBody.avatar  =req.file.path.split("/").slice(1).join("/");
    User.create(req.body)
    res.redirect('/users')
}
module.exports.create = (req,res)=>{
    res.render('Order/order')
}
module.exports.deleteUser =async function(req, res) {
    let idDelete = req.params.id
    User.findByIdAndDelete({_id: idDelete}).then(function(item){
        res.redirect('/admin/store-information')
    })
}
module.exports.analyze = async function(req, res){
    Order.find({}).then(function(item){
        var countTotalNumber =0;
        item.map(number =>{
            countTotalNumber+=parseInt(number.number)
        })
        res.render('Admin/analyze',{items:item, totalNumber:countTotalNumber})
    })
}
module.exports.analyzeAscending = async function(req, res){
    Order.find({}).then(function(item){
        var countTotalNumber =0;
        item.map(number =>{
            countTotalNumber+=parseInt(number.number)
        })
        item.sort(function(a,b){
            return new Date(b.timeOrder) - new Date(a.timeOrder);
        })
        res.render('Admin/analyze',{items:item,totalNumber:countTotalNumber})
    })
}
module.exports.analyzeDescending = async function(req, res){
    Order.find({}).then(function(item){
        var countTotalNumber =0;
        item.map(number =>{
            countTotalNumber+=parseInt(number.number)
        })
        item.sort(function(a,b){
            return new Date(a.timeOrder)- new Date(b.timeOrder) ;
        })
        res.render('Admin/analyze',{items:item,totalNumber:countTotalNumber})
    })
}