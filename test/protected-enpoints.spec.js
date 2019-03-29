const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Protected endpoints', function() {
  let db;

  const { testUsers, testBooks, testChapters, testCompChapters } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  beforeEach('insert articles', () =>
    helpers.seedTables(
      db,
      testUsers, 
      testBooks, 
      testChapters, 
      testCompChapters
    )
  );

  const protectedEndpoints = [
    {
      name: 'GET /api/users',
      path: '/api/users',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/users/completed_chapters/:chapterId',
      path: '/api/users/completed_chapters/1',
      method: supertest(app).get,
    },

    {
      name: 'POST /api/editor/chapters',
      path: '/api/editor/chapters',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/editor/chapters/:chapterId',
      path: '/api/editor/chapters/1',
      method: supertest(app).get,
    },
    {
      name: 'PATCH /api/editor/chapters/:chapterId',
      path: '/api/editor/chapters/1',
      method: supertest(app).patch,
    },
    {
      name: 'DELETE /api/editor/chapters/:chapterId',
      path: '/api/editor/chapters/1',
      method: supertest(app).del,
    },

    {
      name: 'POST /api/editor/books',
      path: '/api/editor/books',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/editor/books/:bookId',
      path: '/api/editor/books/1',
      method: supertest(app).get,
    },
    {
      name: 'PATCH /api/editor/books/:bookId',
      path: '/api/editor/books/1',
      method: supertest(app).patch,
    },
    {
      name: 'DELETE /api/editor/books/:bookId',
      path: '/api/editor/books/1',
      method: supertest(app).del,
    },

    {
      name: 'GET /api/editor/books/:bookId/chapters',
      path: '/api/editor/books/1/chapters',
      method: supertest(app).get,
    },
  ];

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { message: `Missing bearer token` });
      });

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0];
        const invalidSecret = 'bad-secret';
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { message: `Unauthorized request` });
      });

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { user_name: 'user-not-existy', id: 1 };
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { message: `Unauthorized request` });
      });
    });
  });
});