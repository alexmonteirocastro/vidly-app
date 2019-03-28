const express = require('express')
const router = express.Router()
const { Genre, validate } = require('../models/genre')

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name')
        
        res.send(genres)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id)

        if(!genre) return res.status(404).send('The genre with the given Id was not found')

        res.send(genre)

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const newGenre = new Genre({ name: req.body.name })
        
        await newGenre.save()
        res.send(newGenre)

    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name }, {
            new: true
        })
        
        if(!updatedGenre) return res.status(404).send('The genre with the given Id was not found')
        
        res.send(updatedGenre)   

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedGenre = await Genre.findByIdAndRemove(req.params.id)

        if(!removedGenre) return res.status(404).send('The genre with the given Id was not found')
    
        res.send(removedGenre)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router