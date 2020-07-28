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

    before('cleanup', () => db('logixion_tutorials').truncate())

    afterEach('cleanup', () => db('logixion_tutorials').truncate())

    //describe(`Unauthorized requests`, () => {
    //    const testBookmarks = fixtures.makeBookmarksArray()

    //    beforeEach('insert logixion_tutorials', () => {
    //        return db
    //            .into('logixion_tutorials')
    //            .insert(testBookmarks)
    //    })

    //    it(`responds with 401 Unauthorized for GET /tutorials`, () => {
    //        return supertest(app)
    //            .get('/tutorials')
    //            .expect(401, { error: 'Unauthorized request' })
    //    })

    //    it(`responds with 401 Unauthorized for POST /tutorials`, () => {
    //        return supertest(app)
    //            .post('/tutorials')
    //            .send({ title: 'test-title', url: 'http://some.thing.com', rating: 1 })
    //            .expect(401, { error: 'Unauthorized request' })
    //    })

    //    it(`responds with 401 Unauthorized for GET /tutroials/:id`, () => {
    //        const secondBookmark = testBookmarks[1]
    //        return supertest(app)
    //            .get(`/tutorials/${secondBookmark.id}`)A
    //            .expect(401, { error: 'Unauthorized request' })
    //    })

    //    it(`responds with 401 Unauthorized for DELETE /tutorials/:id`, () => {
    //        const aBookmark = testBookmarks[1]
    //        return supertest(app)
    //            .delete(`/tutorials/${aBookmark.id}`)
    //            .expect(401, { error: 'Unauthorized request' })
    //    })
    //})

    describe('GET /tutorials', () => {
        context(`Given no tutorials`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/tutorials')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, [])
            })
        })

        context('Given there are tutorials in the database', () => {
            const testBookmarks = fixtures.makeBookmarksArray()

            beforeEach('insert tutorials', () => {
                return db
                    .into('logixion_tutorials')
                    .insert(testBookmarks)
            })

            it('gets the tutorials from the store', () => {
                return supertest(app)
                    .get('/tutorials')
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200, testBookmarks)
            })
        })

        //context(`Given an XSS attack bookmark`, () => {
        //    const { maliciousBookmark, expectedBookmark } = fixtures.makeMaliciousBookmark()

        //    beforeEach('insert malicious bookmark', () => {
        //        return db
        //            .into('bookmarks')
        //            .insert([maliciousBookmark])
        //    })

        //    it('removes XSS attack content', () => {
        //        return supertest(app)
        //            .get(`/bookmarks`)
        //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
        //            .expect(200)
        //            .expect(res => {
        //                expect(res.body[0].title).to.eql(expectedBookmark.title)
        //                expect(res.body[0].description).to.eql(expectedBookmark.description)
        //            })
        //    })
        //})
    })

    //describe('GET /tutorials/:id', () => {
    //    context(`Given no tutorials`, () => {
    //        it(`responds 404 whe bookmark doesn't exist`, () => {
    //            return supertest(app)
    //                .get(`/tutorials/123`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(404, {
    //                    error: { message: `Tutorial Not Found` }
    //                })
    //        })
    //    })

    //    context('Given there are tutorials in the database', () => {
    //        const testBookmarks = fixtures.makeBookmarksArray()

    //        beforeEach('insert tutorials', () => {
    //            return db
    //                .into('logixion_tutorials')
    //                .insert(testBookmarks)
    //        })

    //        it('responds with 200 and the specified bookmark', () => {
    //            const bookmarkId = 2
    //            const expectedBookmark = testBookmarks[bookmarkId - 1]
    //            return supertest(app)
    //                .get(`/tutorials/${bookmarkId}`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(200, expectedBookmark)
    //        })
    //    })

    //    //context(`Given an XSS attack bookmark`, () => {
    //    //    const { maliciousBookmark, expectedBookmark } = fixtures.makeMaliciousBookmark()

    //    //    beforeEach('insert malicious bookmark', () => {
    //    //        return db
    //    //            .into('bookmarks')
    //    //            .insert([maliciousBookmark])
    //    //    })

    //    //    it('removes XSS attack content', () => {
    //    //        return supertest(app)
    //    //            .get(`/bookmarks/${maliciousBookmark.id}`)
    //    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //    //            .expect(200)
    //    //            .expect(res => {
    //    //                expect(res.body.title).to.eql(expectedBookmark.title)
    //    //                expect(res.body.description).to.eql(expectedBookmark.description)
    //    //            })
    //    //    })
    //    //})
    //})

    //describe('DELETE /tutorials/:id', () => {
    //    context(`Given no tutorials`, () => {
    //        it(`responds 404 whe tutorial doesn't exist`, () => {
    //            return supertest(app)
    //                .delete(`/tutorials/123`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(404, {
    //                    error: { message: `Tutorial Not Found` }
    //                })
    //        })
    //    })

    //    context('Given there are tutorials in the database', () => {
    //        const testBookmarks = fixtures.makeBookmarksArray()

    //        beforeEach('insert tutorials', () => {
    //            return db
    //                .into('logixion_tutorials')
    //                .insert(testBookmarks)
    //        })

    //        it('removes the tutorial by ID from the store', () => {
    //            const idToRemove = 2
    //            const expectedBookmarks = testBookmarks.filter(bm => bm.id !== idToRemove)
    //            return supertest(app)
    //                .delete(`/tutorials/${idToRemove}`)
    //                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                .expect(204)
    //                .then(() =>
    //                    supertest(app)
    //                        .get(`/tutorials`)
    //                        .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                        .expect(expectedBookmarks)
    //                )
    //        })
    //    })
    //})

    //describe('POST /tutorials', () => {
    //    it(`responds with 400 missing 'title' if not supplied`, () => {
    //        const newBookmarkMissingTitle = {
    //            // title: 'test-title',
    //            url: 'https://test.com',
    //            rating: 1,
    //        }
    //        return supertest(app)
    //            .post(`/tutorials`)
    //            .send(newBookmarkMissingTitle)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `'title' is required` }
    //            })
    //    })

    //    it(`responds with 400 missing 'url' if not supplied`, () => {
    //        const newBookmarkMissingUrl = {
    //            title: 'test-title',
    //            // url: 'https://test.com',
    //            rating: 1,
    //        }
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(newBookmarkMissingUrl)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `'url' is required` }
    //            })
    //    })

    //    it(`responds with 400 missing 'rating' if not supplied`, () => {
    //        const newBookmarkMissingRating = {
    //            title: 'test-title',
    //            url: 'https://test.com',
    //            // rating: 1,
    //        }
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(newBookmarkMissingRating)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `'rating' is required` }
    //            })
    //    })

    //    it(`responds with 400 invalid 'rating' if not between 0 and 5`, () => {
    //        const newBookmarkInvalidRating = {
    //            title: 'test-title',
    //            url: 'https://test.com',
    //            rating: 'invalid',
    //        }
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(newBookmarkInvalidRating)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `'rating' must be a number between 0 and 5` }
    //            })
    //    })

    //    it(`responds with 400 invalid 'url' if not a valid URL`, () => {
    //        const newBookmarkInvalidUrl = {
    //            title: 'test-title',
    //            url: 'htp://invalid-url',
    //            rating: 1,
    //        }
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(newBookmarkInvalidUrl)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(400, {
    //                error: { message: `'url' must be a valid URL` }
    //            })
    //    })

    //    it('adds a new bookmark to the store', () => {
    //        const newBookmark = {
    //            title: 'test-title',
    //            url: 'https://test.com',
    //            description: 'test description',
    //            rating: 1,
    //        }
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(newBookmark)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(201)
    //            .expect(res => {
    //                expect(res.body.title).to.eql(newBookmark.title)
    //                expect(res.body.url).to.eql(newBookmark.url)
    //                expect(res.body.description).to.eql(newBookmark.description)
    //                expect(res.body.rating).to.eql(newBookmark.rating)
    //                expect(res.body).to.have.property('id')
    //                expect(res.headers.location).to.eql(`/bookmarks/${res.body.id}`)
    //            })
    //            .then(res =>
    //                supertest(app)
    //                    .get(`/bookmarks/${res.body.id}`)
    //                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //                    .expect(res.body)
    //            )
    //    })

    //    it('removes XSS attack content from response', () => {
    //        const { maliciousBookmark, expectedBookmark } = fixtures.makeMaliciousBookmark()
    //        return supertest(app)
    //            .post(`/bookmarks`)
    //            .send(maliciousBookmark)
    //            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
    //            .expect(201)
    //            .expect(res => {
    //                expect(res.body.title).to.eql(expectedBookmark.title)
    //                expect(res.body.description).to.eql(expectedBookmark.description)
    //            })
    //    })
    //})
})