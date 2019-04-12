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
                    title: 'game title',
                    genre: 'Arcade',
                    releaseYear: 2020
                });

                await request(api).post('/games').send({
                    title: 'second',
                    genre: 'Sport',
                    releaseYear: 1978
                });

                const response = await request(api).get('/games');
                expect(response.body).toEqual([
                    {
                        id: 0,
                        title: 'game title',
                        genre: 'Arcade',
                        releaseYear: 2020
                    },
                    {
                        id: 1,
                        title: 'second',
                        genre: 'Sport',
                        releaseYear: 1978
                    }
                ]);
            });
        });
        
        describe('POST', () => {
            it('should get a response status code 201 on success', async () => {
                const response = await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                expect(response.status).toBe(201);
            });

            it('should get a response status code 422 on failure (incomplete data)', async () => {
                const response = await request(api).post('/games').send({
                    title: 'Pacman',
                    releaseYear: 1980
                });
                expect(response.status).toBe(422);
            });

            it('should get a response status code 405 on failure (title not unique)', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Sport',
                    releaseYear: 2345
                });
                expect(response.status).toBe(405);
            });

            it('should respond with JSON', async () => {
                const response = await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                expect(response.type).toBe('application/json');
            });
            
            it('should get the appropriate response with ID', async () => {
                const response = await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                console.log(response.body);
                expect(response.body).toEqual({ id: 0 });
            });
        });
    });
    describe('ROUTE /games/:id', () => {
        describe('GET', () => {
            it('should get a response status code 200 on success', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).get('/games/0');
                expect(response.status).toBe(200);
            });

            it('should get a response status code 404 on failure', async () => {
                const response = await request(api).get('/games/0');
                expect(response.status).toBe(404);
            });

            it('should respond with JSON', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).get('/games/0');
                expect(response.type).toBe('application/json');
            });
            
            it('should get the appropriate response', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).get('/games/0');
                expect(response.body).toEqual({
                    id: 1,
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
            });
        });

        describe('DELETE', () => {
            it('should get a response status code 200 on success', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).delete('/games/0');
                expect(response.status).toBe(200);
            });

            it('should get a response status code 404 on failure', async () => {
                const response = await request(api).delete('/games/0');
                expect(response.status).toBe(404);
            });

            it('should respond with JSON', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).delete('/games/0');
                expect(response.type).toBe('application/json');
            });
            
            it('should get the appropriate response', async () => {
                await request(api).post('/games').send({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });
                const response = await request(api).delete('/games/0');
                expect(response.body).toEqual({ success: true });
            });
        });
    });
});