import express from 'express'
import { findGenres, findGenreById } from '../dao/genres/read.js';
import createGenre from '../dao/genres/create.js';
import updateGenre from '../dao/genres/update.js';
import deleteGenre from '../dao/genres/delete.js';
import {auth} from '../middleware/auth.js';
import {validate} from '../middleware/validate.js';
import validateGenre from '../validators/genres/validateGenre.js';
import {admin} from '../middleware/admin.js';
import mongoose from 'mongoose';
import {validateObjectId} from '../middleware/validateObjectJd.js'

const router = express.Router()

export const api = '/api/genres'
const api_id = '/:genreId'

router.get('/', async (req,res) => {
    const genres = await findGenres()
    res.send(genres);
})

router.get(api_id, validateObjectId, async (req,res) => {
    const genre = await findGenreById(req.params.genreId)
    if(!genre){
        return res.status(404).send('The genre with given id was not found.')
    }
    res.send(genre)
})

router.post('/', auth, validate(validateGenre), async (req,res) => {
    const genre = await createGenre(req.body)
    res.send(genre)
})

router.put(api_id, auth, async (req,res) => {
    const genre = await updateGenre(req.params.genreId, req.body)
    if(!genre){
        return res.status(404).send('The genre with given id was not found.')
    }
    res.send(genre)
})

router.delete(api_id, [auth, admin], async (req,res) => {
    const genre = await deleteGenre(req.params.genreId)
    if(!genre){
        return res.status(404).send('The genre with given id was not found.')
    }
    res.send(genre)
})

export default {router,api};