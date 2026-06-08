import {describe, it, beforeEach, beforeAll, afterAll, expect} from '@jest/globals'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../../index.js'
import User from '../../../schema/users.js'

describe('auth middleware', () => {
    let token;

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await import('../../../db/connector.js').then((m) => m.default);
        }
    });

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
        }
    });

    const exec = () => {
        return supertest(app)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    };

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(200);
    });
});
