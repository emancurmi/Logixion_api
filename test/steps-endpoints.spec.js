const knex = require('knex')
const fixtures = require('./steps-fixtures')
const app = require('../src/app')

describe('Steps Endpoints', () => {
    let db
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_tours_steps').truncate())

    afterEach('cleanup', () => db('tbl_tours_steps').truncate())

    describe('GET /api/steps', () => {
        context(`Given no steps`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/steps')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are steps in the database', () => {
            const testSteps = fixtures.makeStepsArray()
            const restultSteps = fixtures.resultsStepsArray();

            beforeEach('insert steps', () => {
                return db
                    .into('tbl_tours_steps')
                    .insert(testSteps)
            })

            it('gets the steps from the store', () => {
                return supertest(app)
                    .get('/api/steps')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultSteps)
            })
        })
    })

    describe('GET /api/steps/:id', () => {
        context(`Given no steps`, () => {
            it(`responds 404 whe bookmark doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/steps/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Step doesn't exist` }
                    })
            })
        })

        context('Given there are steps in the database', () => {
            const testBookmarks = fixtures.makeStepsArray()
            const resultBookmarks = fixtures.resultsStepsArray()

            beforeEach('insert steps', () => {
                return db
                    .into('tbl_tours_steps')
                    .insert(testBookmarks)
            })

            it('responds with 200 and the specified bookmark', () => {
                const bookmarkId = 2
                const expectedBookmark = resultBookmarks[bookmarkId - 1]
                return supertest(app)
                    .get(`/api/steps/${bookmarkId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedBookmark)
            })
        })
    })

    describe('DELETE /api/steps/:id', () => {

        context(`Given no steps`, () => {

            it(`responds 404 whe steps doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/steps/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Step doesn't exist` }
                    })
            })
        })

        context('Given there are steps in the database', () => {
            const testSteps = fixtures.makeStepsArray()
            const resultsSteps = fixtures.resultsStepsArray()

            beforeEach('insert steps', () => {
                return db
                    .into('tbl_tours_steps')
                    .insert(testSteps)
            })

            it('removes the step by ID from the store', () => {
                const idToRemove = 2
                const expectedBookmarks = resultsSteps.filter(bm => bm.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/steps/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/steps/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedBookmarks)
                    )
            })
        })
    })

    describe('POST /api/steps', () => {
        it(`responds with 400 missing 'name' if not supplied`, () => {
            const newStepMissingTitle = {
                //element: ".step-one",
                placement: "bottom",
                title: "1",
                content: "1",
                tutorialid: 31 
            }
            return supertest(app)
                .post(`/api/steps`)
                .send(newStepMissingTitle)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'element' in request body` }
                })
        })

        it('adds a new steps to the store', () => {
            const newStep = {
                element: ".step-one",
                placement: "bottom",
                title: "1",
                content: "1",
                tutorialid: 31 
            }
            return supertest(app)
                .post(`/api/steps`)
                .send(newStep)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.element).to.eql(newStep.element)
                    expect(res.body.placement).to.eql(newStep.placement)
                    expect(res.body.title).to.eql(newStep.title)
                    expect(res.body.content).to.eql(newStep.content)
                    expect(res.body.tutorialid).to.eql(newStep.tutorialid)

                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/steps/${res.body.id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/steps/${res.body.id}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })
})