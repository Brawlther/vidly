import express from 'express';
import User from '../schema/users.js';
import { readUser, readUsers } from '../dao/users/read.js';
import createUser from '../dao/users/create.js';
import {validate} from '../middleware/validate.js';
import validateUser from '../validators/users/validateUser.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import {auth} from '../middleware/auth.js';

const router = express.Router()

const api = '/api/users'

router.get('/', async (req,res) => {
    const users = await readUsers()
    res.send(users);
})

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -__v');
    res.send(user)
})

router.get('/:userId', async (req,res) => {
    const user = await readUser(req.params.userId)
    if(!user){
        return res.status(404).send('The user with given id was not found.')
    }
    res.send(user)
})

router.post('/', validate(validateUser), async (req, res) => {
    try {
        // Check if user exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send('A user with the given email already exists.');
        }

        const newUser = new User(req.body);

        // Hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // Create user
        const createdUser = await createUser(newUser);

        const token = createdUser.generateAuthToken();

        res
            .status(201)
            .header('x-auth-token', token)
            .send(
                _.pick(createdUser,['_id','name', 'email'])
            );
    } catch (err) {
        res.status(500).send('An error occurred while processing your request.');
    }
});

export default {router, api}