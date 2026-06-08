import express from 'express';
import User from '../schema/users.js';
import {validate} from '../middleware/validate.js';
import validateAuth from '../validators/auth/validateAuth.js';
import bcrypt from 'bcrypt';

const router = express.Router()

const api = '/api/auth'

router.post('/', validate(validateAuth), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = user.generateAuthToken();

        res.send(token)
    } catch (err) {
        res.status(500).send('An error occurred while authentication.');
    }
});

export default {router, api}