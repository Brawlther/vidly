import mongoose from 'mongoose';
import {movieSchema} from './movies.js';
import {customerSchema} from './customers.js';

const rentalSchema = new mongoose.Schema({
    movie: {
        type: movieSchema,
    },
    customer: {
        type: customerSchema,
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
    }
});

const Rental = mongoose.model('rentals', rentalSchema);

export default Rental;