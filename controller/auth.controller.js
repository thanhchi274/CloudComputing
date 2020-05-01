var User = require("../models/user.model");   
const md5 = require('md5')
module.exports.login =(req, res) => {
    return res.render('auth/login');
};
module.exports.postLogin= async (req,res)=>{
    let name = req.body.name
    let password = md5(req.body.password);
    User.find({name:name,password: password}).then(function(user){
        if(user.length===0){
            res.render('auth/login',{errors:[
                'Check again username and password '
            ],
            values:req.body
        })}
    })
    User.find({name:name, password:password}).lean().then(function(userAccount) {
        userAccount.forEach(function(userAccount) {
            res.cookie('userID',userAccount._id, {signed: true});
            let base64typeUserName = Buffer.from(userAccount.type+userAccount.name).toString('base64');
            res.cookie('type',base64typeUserName)
            let base64Check = Buffer.from(base64typeUserName, 'base64').toString('ascii')
            let redirectCheck = base64Check.slice(0,5)
            let permission =redirectCheck.toString()
            permission ==="Admin"? res.redirect('/admin'): res.redirect('/users')
            });
        })
}
module.exports.logOut = async(req,res)=>{
    res.clearCookie('userID');
    res.redirect('/')
}