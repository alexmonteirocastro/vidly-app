const mongoose = require('mongoose')
const express = require('express')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const customers = require('./routes/customers') 
const rentals = require('./routes/rentals') 
const home = require('./routes/home')

const app = express()

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB'))


app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/', home)

const port = process.env.PORT || 9000
app.listen(port, console.log(`Server listening on port ${port}...`))