const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Books Endpoints', function() {
  let db;

  const { testUsers, testBooks, testChapters, testCompChapters } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/books/', () => {
    context('given nothing', () => {
      it('responds with a 200 and empty list', () => {
        return supertest(app)
          .get(`/api/books/`)
          .expect(200, []);
      });
    });

    context('given books', () => {
      beforeEach('insert data', () => 
        helpers.seedTables(
          db,
          testUsers,
          testBooks,
          testChapters,
          testCompChapters
        )
      );

      it('responds with a 200 and a list of books', () => {
        const expectedBooks = helpers.makeExpectedBookList(testBooks, testChapters);
        return supertest(app)
          .get(`/api/books`)
          .expect(200, expectedBooks);
      });
    });

    context(`Given an XSS attack book/chapters`, () => {
      const { maliciousBook, expectedBook } = helpers.makeMaliciousBook();
      const maliciousChapter = helpers.makeMaliciousChapter();

      beforeEach('insert malicious data', () => 
        helpers.seedTables(
          db,
          testUsers,
          maliciousBook,
          maliciousChapter
        )
      );

      it('removes XSS content', () => {
        return supertest(app)
          .get('/api/books')
          .expect(200, expectedBook)
      });
    });
  });
});