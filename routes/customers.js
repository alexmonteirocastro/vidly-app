const express = require('express')
const router = express.Router()
const { Customer, validate } = require('../models/customer')


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name')
        
        res.send(customers)

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)

        if(!customer) return res.status(404).send('The customer with the given Id was not found')

        res.send(customer)

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const newCustomer = new Customer({ isGold: req.body.isGold, name: req.body.name, phone: req.body.phone })
        
        await newCustomer.save()
        res.send(newCustomer)

    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name }, {
            new: true
        })
        
        if(!updatedCustomer) return res.status(404).send('The customer with the given Id was not found')
        
        res.send(updatedCustomer)   

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removedCustomer = await Customer.findByIdAndRemove(req.params.id)

        if(!removedCustomer) return res.status(404).send('The customer with the given Id was not found')
    
        res.send(removedCustomer)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router