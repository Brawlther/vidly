import express from 'express';
import { readRental, readRentals } from '../dao/rentals/read.js';
import createRental from '../dao/rentals/create.js';
import {validate} from '../middleware/validate.js';
import validateRental from '../validators/rentals/validateRental.js';

const router = express.Router()

const api = '/api/rentals'

router.get('/', async (req,res) => {
    const rentals = await readRentals()
    res.send(rentals);
})

router.get('/:rentalId', async (req,res) => {
    const rental = await readRental(req.params.rentalId)
    if(!rental){
        return res.status(404).send('The rental with given id was not found.')
    }
    res.send(rental)
})

router.post('/', validate(validateRental), async (req, res) => {
    try {
        const result = await createRental(req.body);
        res.send(result);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).send(err.message);
        }

        if (err.name === 'ValidationError') {
            return res.status(400).send({
                error: 'Rental data is invalid.',
                details: Object.values(err.errors).map((e) => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        throw err;
    }
})

export default {router, api}