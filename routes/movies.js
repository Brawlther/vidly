import express from 'express'
import createMovie from '../dao/movies/create.js'
import updateMovie from '../dao/movies/update.js'
import { readMovie, readMovies } from '../dao/movies/read.js'
import deleteMovie from '../dao/movies/delete.js'
import validateMovie from '../validators/movies/validateMovie.js'
import { validate } from '../middleware/validate.js'

const router = express.Router()

const api = '/api/movies'

router.get('/', async (req,res) => {
    const movies = await readMovies()
    res.send(movies);
})

router.get('/:movieId', async (req,res) => {
    const movie = await readMovie(req.params.movieId)
    if(!movie){
        return res.status(404).send('The movie with given id was not found.')
    }
    res.send(movie)
})

router.post('/', validate(validateMovie), async (req, res) => {
    try {
        const result = await createMovie(req.body);
        res.send(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send({
                error: 'Movie data is invalid.',
                details: Object.values(err.errors).map((e) => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        throw err;
    }
})

router.put('/:movieId', async (req, res) => {
    try {
        const result = await updateMovie(req.params.movieId, req.body);
        if (!result) {
            return res.status(404).send('The movie with given id was not found.');
        }
        res.send(result);
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).send({
                error: 'Movie data is invalid.',
                details: Object.values(err.errors).map((e) => ({
                    field: e.path,
                    message: e.message,
                })),
            });
        }
        throw err;
    }
})

router.delete('/:movieId', async (req, res) => {
    const result = await deleteMovie(req.params.movieId);
    res.send(result);
})

export default {router,api};