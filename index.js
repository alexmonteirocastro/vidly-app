const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Drama'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Sci-fi'},
    {id: 5, name: 'Documentary'},
    {id: 6, name: 'Horror'}
]

app.get('/', (req, res) => {
    res.send('Welcome to Vidly!')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = queryGenres(req.params.id, res)
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    }
    
    genres.push(newGenre)
    res.send(newGenre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = queryGenres(req.params.id, res)
    const { error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 9000
app.listen(port, console.log(`Server listening on port ${port}...`))