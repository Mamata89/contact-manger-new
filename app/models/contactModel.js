const mongooe = require("mongoose")
const validator = require("validator")
const Schema = mongooe.Schema

const contactSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:6
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        // custom validations
        validate: {
            validator: function (value) {
                return validator.isNumeric(value)
            },
            message: function () {
                return 'invalid mobile number format'
            }
        }
    },
    
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return "Inavlid"
            }
        }

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


const Contact = mongooe.model('Contacts',contactSchema)
module.exports ={
    Contact
}