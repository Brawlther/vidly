import {describe, it, expect, jest} from '@jest/globals'
import User from '../../../schema/users.js'
import {auth} from '../../../middleware/auth.js'
import mongoose from 'mongoose'

describe('auth middleware',()=>{
    it('should populate req.user with the payload of a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
        };
        const token = new User(payload).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token),
        };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);

        expect(req.user).toMatchObject(payload);
    });
})