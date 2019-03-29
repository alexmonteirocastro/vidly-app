const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).required(),
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
exports.userSchema = userSchema