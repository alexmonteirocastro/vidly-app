const mongoose = require('mongoose')
const Joi = require('joi')

const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 200
            }
        }),
        required: true
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50 
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 9,
                maxlength: 16
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

function validateRental(rental){
    const schema = {
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required(),
    }
    return Joi.validate(rental, schema)
}

exports.Rental =  Rental
exports.validate = validateRental
