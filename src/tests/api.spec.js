const request = require('supertest');
const api = require('../../');
const data = require('../models/games');

afterEach(async () => {
    await data.truncate();
});

describe('----- API -----', () => {
    describe('ROUTE /games', () => {
        describe('GET', () => {
            it('should get a response status code 200 on success', async () => {
                const response = await request(api).get('/games');
                expect(response.status).toBe(200);
            });

            it('should respond with JSON', async () => {
                const response = await request(api).get('/games');
                expect(response.type).toBe('application/json');
            });

            it('should respond with empty array when no games in database', async () => {
                const response = await request(api).get('/games');
                expect(response.body).toEqual([]);
            });

            it('should respond with the array when there are games in database', async () => {
                await request(api).post('/games').send({
                    title: 'resource title',
                    genre: 'Arcade',
                    releaseYear: 2020
                });

                await request(api).post('/games').send({
                    title: 'resource title2',
                    genre: 'Sport',
                    releaseYear: 1978
                });

                const response = await request(api).get('/games');
                expect(response.body).toEqual([
                    {
                        id: 0,
                        title: 'resource title',
                        genre: 'Arcade',
                        releaseYear: 2020
                    },
                    {
                        id: 1,
                        title: 'resource title2',
                        genre: 'Sport',
                        releaseYear: 1978
                    }
                ]);
            });
        });
        
        describe('POST', () => {

        });
    });
    describe('ROUTE /games/:id', () => {
        describe('GET', () => {

        });

        describe('DELETE', () => {

        });
    });
});