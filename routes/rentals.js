const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Fawn = require('fawn')
const { Rental, validate } = require('../models/rental')
const { Movie } = require('../models/movie')
const { Customer } = require('../models/customer')

Fawn.init(mongoose)

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut')
        
        res.send(rentals)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id)

        if(!rental) return res.status(404).send('The rental with the given Id was not found')

        res.send(rental)

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const movie = await Movie.findById(req.body.movieId)
        if(!movie)  return res.status(400).send('Invalid movie.')

        const customer = await Customer.findById(req.body.customerId)
        if(!customer)  return res.status(400).send('Invalid customer.')

        if(movie.numberInStock === 0) return res.status(400).send('Movie not available in stock.')
        
        let newRental = new Rental({ 
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
            },
        })
        
        try {

            new Fawn.Task()
                .save('rentals', newRental)
                .update('movies', { _id: movie._id }, { 
                    $inc: { numberInStock: -1 }
                })
                // .remove()
                .run()

            res.send(newRental)   

        } catch (error) {
            res.status(500).send('Soemthing failed.', error)
        }

    } catch (error) {
        console.log(error)
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        const removedRental = await Rental.findByIdAndRemove(req.params.id)

        if(!removedRental) return res.status(404).send('The rental with the given Id was not found')
    
        res.send(removedRental)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router