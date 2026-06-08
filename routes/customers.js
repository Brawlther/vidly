import express from 'express'
import { readCustomer, readCustomers } from '../dao/customers/read.js'
import createCustomer from '../dao/customers/create.js'
import validateCustomer from '../validators/customers/validateCustomer.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()
const api = '/api/customers'

router.get('/', async (req,res) => {
    const customers = await readCustomers()
    res.send(customers);
})

router.get('/:customerId', async (req,res) => {
    const customer = await readCustomer(req.params.customerId)
    if(!customer){
        return res.status(404).send('The customer with given id was not found.')
    }
    res.send(customer)
})

router.post('/', validate(validateCustomer), async (req, res) => {
    try {
        const customer = await createCustomer({
            isGold: req.body.isGold,
            name: req.body.name,
            phone: req.body.phone
        })
        res.send(customer)
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send('Error: customer data is invalid.')
        }
        throw err
    }
})

export default {router,api}