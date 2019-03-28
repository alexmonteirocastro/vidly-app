const express = require('express')
const router = express.Router()
const { Movie, validate } = require('../models/movie')
const { Genre } = require('../models/genre')

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort('title')
        
        res.send(movies)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)

        if(!movie) return res.status(404).send('The movie with the given Id was not found')

        res.send(movie)

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const genre = await Genre.findById(req.body.genreId)
        if(!genre)  return res.status(400).send('Invalid genre.')
        
        let newMovie = new Movie({ 
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            } ,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        
        newMovie = await newMovie.save()
        res.send(newMovie)

    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {title: req.body.title }, {
            new: true
        })
        
        if(!updatedMovie) return res.status(404).send('The movie with the given Id was not found')
        
        res.send(updatedMovie)   

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedMovie = await Movie.findByIdAndRemove(req.params.id)

        if(!removedMovie) return res.status(404).send('The movie with the given Id was not found')
    
        res.send(removedMovie)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router