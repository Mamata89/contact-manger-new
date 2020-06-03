const express = require("express")
const _ = require("lodash")
const {User} = require('../models/userModel')




module.exports.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then(function(user){
        res.send(_.pick(user,['_id','username','email']))
    })
    .catch(function(err){
        res.send(err)
    })
}
module.exports.login=(req,res)=>{
    const body=req.body
    User.findByCredentials(body.email,body.password)
    .then(function(user){
        return user.generateToken()
    })
    .then(function(token){
        // res.setHeader('x-auth',token).send({})
       
         res.send(token)
    })
    .catch(function(err){
        res.send(err)
    })

}
module.exports.account=(req,res)=>{
    const {user}=req
  res.send(_.pick(user,['_id','username','email']))
}

module.exports.logout = (req, res) => {
    const {user,token} = req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        .then(function(){
            res.send({notice:"Suceesfully deletd"})
        })
        .catch(function(err){
            res.send(err)
        })
}