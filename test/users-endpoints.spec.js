const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const bcrypt = require('bcryptjs');

describe('Users Endpoints', () => {
  let db;

  const { testUsers, testBooks, testChapters, testCompChapters } = helpers.makeFixtures();
  const testUser = testUsers[0];

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

  describe(`GET /api/users`, () => {
    context('given users but no ccs', () => {
      beforeEach('insert users', () =>
        helpers.seedTables(
          db,
          testUsers
        )
      );

      it('responds with a 200 and the user info', () => {
        return supertest(app)
          .get('/api/users')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.id).to.eql(testUser.id);
            expect(res.body.user_name).to.eql(testUser.user_name);
          });
      });
    });

    context('given users and ccs', () => {
      beforeEach('insert things', () =>
        helpers.seedTables(
          db,
          testUsers,
          testBooks,
          testChapters,
          testCompChapters
        )
      );

      it('responds with a 200 and the user info', () => {
        const expectedCompChapters = helpers.makeExpectedCompChapters(testUser.id, testCompChapters);
        return supertest(app)
          .get('/api/users')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.id).to.eql(testUser.id);
            expect(res.body.user_name).to.eql(testUser.user_name);
            expect(res.body.completed_chapters).to.eql(expectedCompChapters);
          });
      });
    });

    context('given an xss attack user', () => {
      beforeEach('insert things', () =>
        helpers.seedTables(
          db,
          testUsers,
          testBooks,
          testChapters,
          testCompChapters
        )
      );

      it('removes xss attack content', () => {
        const testUser = testUsers[1];
        return supertest(app)
          .get('/api/users')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.user_name).to.eql(`&lt;script&gt;console.log('hi!')&lt;/script&gt;test-user-2`);
          });
      });
    });
  });

  describe(`POST /api/users`, () => {
    context(`User Validation`, () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(
          db,
          testUsers
        )
      );
  
      const requiredFields = ['user_name', 'password']
  
      requiredFields.forEach(field => {
        const registerAttemptBody = {
          user_name: 'test user_name',
          password: 'test password',
        }
  
        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]
          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              message: `Missing '${field}' in request body`,
            })
        });
      })
      it(`responds 400 'Password be longer than 6 characters' when empty password`, () => {
        const userShortPassword = {
          user_name: 'test user_name',
          password: '123',
          full_name: 'test full_name'
        }
        return supertest(app)
          .post('/api/users')
          .send(userShortPassword)
          .expect(400, { message: `Password must be longer than 6 characters`});
      });
  
      it(`responds 400 'Password be less than 72 characters' when long password`, () => {
        const userLongPassword = {
          user_name: 'test user_name',
          password: '*'.repeat(73),
          full_name: 'test full_name',
        }
        return supertest(app)
          .post('/api/users')
          .send(userLongPassword)
          .expect(400, { message: `Password must be less than 72 characters` });
      });
      it(`responds 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
          user_name: 'test user_name',
          password: '   120398sadlfkjas',
          full_name: 'test full_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, {message: 'Password must not start or end with empty spaces'});
      });
      it(`responds 400 error when password ends with spaces`, () => {
        const userPasswordStartsSpaces = {
          user_name: 'test user_name',
          password: '120398sadlfkjas    ',
          full_name: 'test full_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, {message: 'Password must not start or end with empty spaces'});
      });
      it(`responds 400 'User name already taken' when user_name isn't unique`, () => {
        const duplicateUser = {
          user_name: testUser.user_name,
          password: '11AAaa!!',
          full_name: 'test full_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(duplicateUser)
          .expect(400, {message: 'User name already taken'});
      });
    })
    context('Happy path', () => {
      it(`responds 201, serialized user, storing bcrypted password`, () => {
        const newUser ={
          user_name: 'test user_name',
          password: '11AAaa!!',
          full_name: 'test full_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.user_name).to.eql(newUser.user_name)
            expect(res.body).to.not.have.property('password')
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
            const expectedDate = new Date().toLocaleString()
            const actualDate = new Date(res.body.date_created).toLocaleString()
            expect(actualDate).to.eql(expectedDate)
          })
          .expect(res => {
            db
              .from('users')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then(row => {
                expect(row.user_name).to.eql(newUser.user_name)
                const expectedDate = new Date().toLocaleString()
                const actualDate = new Date(row.date_created).toLocaleString()
                expect(actualDate).to.eql(expectedDate)
  
                return bcrypt.compare(newUser.password, row.password);
              })
              .then(compareMatch => {
                expect(compareMatch).to.be.true;
              });
          });
      });
    });
  });
});