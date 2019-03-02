const express = require('express')
const genres = require('./routes/genres')
const home = require('./routes/home')

const app = express()
app.use(express.json())
app.use('/api/genres', genres)
app.use('/', home)

const port = process.env.PORT || 9000
app.listen(port, console.log(`Server listening on port ${port}...`))