const knex = require('knex')
const fixtures = require('./steps-fixtures')
const app = require('../src/app')

describe('Help Endpoints', () => {
    describe('GET /api/help', () => {
        context('Given there are help info on page', () => {
            it('gets the help list', () => {
                return supertest(app)
                    .get('/api/help')
                    .expect(200)
            })
        })
    })
})