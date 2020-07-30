const knex = require('knex')
const fixtures = require('./tutorials-fixtures')
const app = require('../src/app')

describe('Tutorials Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => db('tbl_tours_tutorials').truncate())

    afterEach('cleanup', () => db('tbl_tours_tutorials').truncate())

    describe('GET /api/tutorials', () => {
        context(`Given no tutorials`, () => {

            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/tutorials')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are tutorials in the database', () => {
            const testTutorials = fixtures.makeTutorialsArray()
            const restultTutorials = fixtures.resultsTutorialsArray();

            beforeEach('insert tutorials', () => {
                return db
                    .into('tbl_tours_tutorials')
                    .insert(testTutorials)
            })

            it('gets the tutorials from the store', () => {
                return supertest(app)
                    .get('/api/tutorials')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, restultTutorials)
            })
        })
    })

    describe('GET /api/tutorials/:id', () => {
        context(`Given no tutorials`, () => {
            it(`responds 404 whe bookmark doesn't exist`, () => {
                return supertest(app)
                    .get(`/api/tutorials/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Tutorial doesn't exist` }
                    })
            })
        })

        context('Given there are tutorials in the database', () => {
            const testBookmarks = fixtures.makeTutorialsArray()
            const resultBookmarks = fixtures.resultsTutorialsArray()

            beforeEach('insert tutorials', () => {
                return db
                    .into('tbl_tours_tutorials')
                    .insert(testBookmarks)
            })

            it('responds with 200 and the specified bookmark', () => {
                const bookmarkId = 2
                const expectedBookmark = resultBookmarks[bookmarkId - 1]
                return supertest(app)
                    .get(`/api/tutorials/${bookmarkId}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, expectedBookmark)
            })
        })
    })

    describe('DELETE /api/tutorials/:id', () => {

        context(`Given no tutorials`, () => {

            it(`responds 404 whe tutorial doesn't exist`, () => {
                return supertest(app)
                    .delete(`/api/tutorials/123`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(404, {
                        error: { message: `Tutorial doesn't exist` }
                    })
            })
        })

        context('Given there are tutorials in the database', () => {
            const testTutorials = fixtures.makeTutorialsArray()
            const resultsTutorials = fixtures.resultsTutorialsArray()

            beforeEach('insert tutorials', () => {
                return db
                    .into('tbl_tours_tutorials')
                    .insert(testTutorials)
            })

            it('removes the tutorial by ID from the store', () => {
                const idToRemove = 2
                const expectedBookmarks = resultsTutorials.filter(bm => bm.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/tutorials/${idToRemove}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(204)
                    .then(() =>
                        supertest(app)
                            .get(`/api/tutorials/`)
                            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                            .expect(expectedBookmarks)
                    )
            })
        })
    })

    describe('POST /api/tutorials', () => {
        it(`responds with 400 missing 'name' if not supplied`, () => {
            const newBookmarkMissingTitle = {
                //name: "DefaultTutorial",
                userid: 1
            }
            return supertest(app)
                .post(`/api/tutorials`)
                .send(newBookmarkMissingTitle)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(400, {
                    error: { message: `Missing 'name' in request body` }
                })
        })

        it('adds a new tutorial to the store', () => {
            const newTutorial = {
                name: "NewTutorial",
                userid: 1
            }
            return supertest(app)
                .post(`/api/tutorials`)
                .send(newTutorial)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .expect(201)
                .expect(res => {
                    expect(res.body.name).to.eql(newTutorial.name)
                    expect(res.body.userid).to.eql(newTutorial.userid)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/tutorials/${res.body.id}`)
                })
                .then(res =>
                    supertest(app)
                        .get(`/api/tutorials/${res.body.id}`)
                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                        .expect(res.body)
                )
        })
    })
})