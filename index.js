const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const express = require('express')
const genres = require('./routes/genres')
const movies = require('./routes/movies')
const users = require('./routes/users') 
const auth = require('./routes/auth') 
const customers = require('./routes/customers') 
const rentals = require('./routes/rentals') 
const home = require('./routes/home')

const app = express()

if(!config.get('jwtPrivateKey')){
        console.log('FATAL ERROR: jwtPrivateKey is not defined.')
        process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.log('Could not connect to MongoDB'))


app.use(express.json())
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/', home)

const port = process.env.PORT || 9000
app.listen(port, console.log(`Server listening on port ${port}...`))