import {describe, it, beforeEach, beforeAll, afterAll, expect} from '@jest/globals'
import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../../index.js'
import { api } from '../../../routes/genres.js'
import User from '../../../schema/users.js'
import Genre from '../../../schema/genres.js'

describe('/api/genres', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await import('../../../db/connector.js').then((m) => m.default);
        }
    });

    beforeEach(async () => {
        await Genre.deleteMany({});
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
        }
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await supertest(app).get(api);
            expect(res.status).toBe(200);
            /** @type {{ name: string }[]} */
            const body = res.body;
            expect(body.length).toBe(2);
            expect(body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();
            const res = await supertest(app).get(`${api}/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.get('name'));
        });

        it('should return 404 if invalid id is passed', async () => {
            const res = await supertest(app).get(`${api}/1`);
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        const exec = async () => {
            return supertest(app)
                .post(api)
                .set('x-auth-token', token)
                .send({ name });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if genre name is less than 5 characters', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre name is more than 50 characters', async () => {
            name = 'a'.repeat(51);
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {
            await exec();
            const actual = await Genre.find({ name });
            expect(actual).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});
