import mongoose from 'mongoose';
import { genreSchema } from './genres.js';

const movieSchema = new mongoose.Schema({
    title: String,
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number,
})

const Movie = mongoose.model('movies', movieSchema);

export {movieSchema};
export default Movie;