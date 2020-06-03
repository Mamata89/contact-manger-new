const mongoose = require("mongoose")

const setUpDB = () => {
    mongoose.connect("mongodb://localhost:27017/contacts1", {useNewUrlParser : true})
        .then(function() {
            console.log("Connected to DB")
        })
        .catch((err) => {
            console.log(err)
        })
}


module.exports = setUpDB