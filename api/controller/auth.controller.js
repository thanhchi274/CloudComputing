var User = require("../../models/user.model");   
const md5 = require('md5')
module.exports.postLogin= async function(req,res){
    let name = req.body.name
    let password =md5(req.body.password);
    User.find({name:name,password: password}).then((user)=>{
        if(user===null ||[]){
            res.json({
                errors:[
                    'Check again username and password 1'
                ],
                values:req.body
            })
            return;
        }
        else{
            res.json(user);
        }
    })
}