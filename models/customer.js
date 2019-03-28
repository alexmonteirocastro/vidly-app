const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        minlength: 9,
        maxlength: 13,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer){
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(9).max(13).required()
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer
exports.customerSchema = customerSchema