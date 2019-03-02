const express = require('express')
const Joi = require('joi')
const router = express.Router()


const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Drama'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Sci-fi'},
    {id: 5, name: 'Documentary'},
    {id: 6, name: 'Horror'}
]

router.get('/', (req, res) => {
    res.send(genres)
})

router.get('/:id', (req, res) => {
    const genre = queryGenres(req.params.id, res)
    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }
    
    genres.push(newGenre)
    res.send(newGenre)
})

router.put('/:id', (req, res) => {
    const genre = queryGenres(req.params.id, res)
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

router.delete('/:id', (req, res) => {
    const genre = queryGenres(req.params.id, res)
    const genreIndex = genres.indexOf(genre)
    genres.splice(genreIndex)
    res.send(genre)
})

function queryGenres(genreId, res) {
    const genre = genres.find(genre => genre.id === parseInt(genreId))
    if(!genre) return res.status(404).send('Genre not found')
    return genre
}

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

module.exports = router