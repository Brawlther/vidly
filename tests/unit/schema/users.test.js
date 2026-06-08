import {describe, expect, jest} from '@jest/globals'
import User from '../../../schema/users.js'
import jsonwebtoken from 'jsonwebtoken'
import config from 'config'
import mongoose from 'mongoose'

describe('user.generateAuthToken', ()=>{
    it('should return a valid JWT', ()=>{
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload)
        const token = user.generateAuthToken()
        const decoded = jsonwebtoken.verify(token, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject(payload)
    })
})