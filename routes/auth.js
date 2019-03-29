const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { User } = require('../models/user')

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({ email: req.body.email })
        if(!user) return res.status(400).send('Invalid email or password.')

        const validPassord = await bcrypt.compare(req.body.password, user.password)
        if(!validPassord) return res.status(400).send('Invalid email or password.')

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'))
        res.send(token)

    } catch (error) {
        console.log(error)
    }
    
})

function validate(user){
    const schema = {
        email: Joi.string().max(255).required().email(),
        password: Joi.string().max(255).required(),
    }
    return Joi.validate(user, schema)
}

module.exports = router