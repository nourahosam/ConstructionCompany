const mongoose = require("mongoose")
const validator = require('validator')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    password: String,
    salt: String
})

const User = mongoose.model('User', userSchema)

module.exports = User