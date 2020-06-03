const express= require("express")
const {Contact} = require('../models/contactModel')

module.exports.create = (req,res) => {
    const body = req.body
    const contact = new Contact(body)
    contact.user = req.user._id
    contact.save()
        .then(function(contact){
            res.send(contact)
        })
        .catch(function(err){
            res.send(err)
        })
}

module.exports.list = (req,res) => {
    Contact.find({user: req.user._id})
        .then(function(contacts){
            res.send(contacts)
        })
        .catch(function(err){
            res.send(err)
        })

}

module.exports.show = (req,res) => {
    const id = req.params.id
    Contact.findById(id)
        .then(function(contact){
            if(contact){
                res.send(contact)
            }else{
                res.send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
}


module.exports.update = (req,res) => {
    const id = req.params.id
    const data = req.body
    Contact.findOneAndUpdate({ _id: id }, {$set:data},{new: true, runValidators: true}  )
        .then((contact) => {
            if (contact) {
                res.send(contact)
            } else {
                res.send({})
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Contact.findByIdAndDelete(id)
        .then(function(contact){
            res.send({
                notice:"deleted successfully",
                contact
            })
        })
        .catch(function(err){
            res.send(err)
        })
}