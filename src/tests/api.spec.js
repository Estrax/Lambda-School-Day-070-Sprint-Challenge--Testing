const request = require('supertest');
const api = require('../../');
const data = require('../models/games');

afterEach(async () => {
    await data.truncate();
});

describe('----- API -----', () => {
    describe('ROUTE /games', () => {
        describe('GET', () => {

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