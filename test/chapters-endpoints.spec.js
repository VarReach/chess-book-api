const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Chapter Endpoints', function() {
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

  describe('GET /api/books/:bookId/chapter/:chapterIndex', () => {
    context('given nothing', () => {
      it('responds with a 404 if book doesn\'t exist', () => {
        const bookId = 33333;
        const chapterIndex = 2;
        return supertest(app)
          .get(`/api/books/${bookId}/chapter/${chapterIndex}`)
          .expect(404, { message: `Book ${bookId} doesn\'t exist` });
      });
    });

    context('given data', () => {
      beforeEach('insert data', () =>
        helpers.seedTables(
          db,
          testUsers,
          testBooks,
          testChapters,
          testCompChapters
        )
      )

      it('responds with a 404 if chapter at index doesn\'t exist', () => {
        const bookId = 1;
        const chapterIndex = 34342;
        return supertest(app)
          .get(`/api/books/${bookId}/chapter/${chapterIndex}`)
          .expect(404, { message: `Chapter with index ${chapterIndex} in Book ${bookId} doesn't exist` });
      });

      it('reponds with 200 and the chapter', () => {
        const bookId = 1;
        const chapterIndex = 1;
        const expectedChapter = helpers.makeExpectedChapter(testBooks, testChapters, bookId, chapterIndex);
        return supertest(app)
          .get(`/api/books/${bookId}/chapter/${chapterIndex}`)
          .expect(200, expectedChapter);
      });
    });
  });
});