const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
      perms: null,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: `<script>console.log('hi!')</script>test-user-2`,
      password: 'password',
      perms: null,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
      perms: null,
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
      perms: null,
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ];
}

function makeBooksArray() {
  return [
    {
      id: 1,
      title: 'testing',
      blurb: 'testing a blurb',
      chapter_order: [1, 2],
      default_book: null,
      published: true,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      title: 'testing-2',
      blurb: 'testing a blurb-2',
      chapter_order: [3,4],
      default_book: true,
      published: true,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      title: 'testing-3',
      blurb: 'testing a blurb-3',
      chapter_order: [],
      default_book: null,
      published: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: null,
      date_modified: null
    },
  ];
}

function makeChaptersArray() {
  return [
    {
      id: 1,
      book_id: 1,
      title: 'testing',
      content: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      book_id: 1,
      title: 'testing-2',
      content: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      book_id: 2,
      title: 'testing-3',
      content: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 4,
      book_id: 2,
      title: 'testing-4',
      content: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 5,
      book_id: 3,
      title: 'testing-5',
      content: null,
      date_created: '2029-01-22T16:28:32.615Z',
      date_published: null,
      date_modified: null
    },
  ];
}

function makeCompletedChaptersArray() {
  return [
    {
      id: 1,
      ids: '1-1',
      user_id: 1,
      chapter_id: 1,
      date_completed: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      ids: '1-2',
      user_id: 1,
      chapter_id: 2,
      date_completed: '2029-01-22T16:28:32.615Z'
    },
  ];
}

function makeFixtures() {
  const testUsers = this.makeUsersArray();
  const testBooks = this.makeBooksArray();
  const testChapters = this.makeChaptersArray();
  const testCompChapters = this.makeCompletedChaptersArray();
  return { testUsers, testBooks, testChapters, testCompChapters };
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into('users')
    .insert(preppedUsers);
}

function seedTables(db, users, books, chapters, completed_chapters) {
  return seedUsers(db, users)
    .then(() => 
      db
        .into('books')
        .insert(books)
    )
    .then(() => 
      db
        .into('chapters')
        .insert(chapters)
    )
    .then(() => 
      db
        .into('completed_chapters')
        .insert(completed_chapters)
    );
}

function makeExpectedCompChapters(userId, compChapters) {
  const cC = [];
  compChapters.forEach(cc => {
    if (userId === cc.user_id) {
      cC.push({ id: cc.id, date_completed: cc.date_completed });
    }
  });
  return cC;
}

function makeExpectedChapter(testBooks, testChapters, bookId, chapterIndex) {
  // const chapterId = testBooks[bookId].chapterOrder[chapterIndex - 1];
  const book = testBooks.find(book => book.id === bookId);
  const chapterId = book.chapter_order[chapterIndex - 1];
  const chapter = testChapters.find(chapter => chapter.id === chapterId);
  return {
    'book_title': book.title,
    'content': chapter.content,
    date_published: chapter.date_published,
    id: chapter.id,
    title: chapter.title,
    last_chapter_available: book.chapter_order.length
  };
}

function makeExpectedBookList(testBooks, testChapters) {
  let books = [];
  testBooks.forEach(book => {
    if (book.published) {
      books.push({
        id: book.id,
        title: book.title,
        blurb: book.blurb,
        default_book: book.default_book,
        chapter_order: book.chapter_order,
        chapters: book.chapter_order.map(id => {
          const chapter = testChapters.find(chapter => chapter.id === id);
          return {
            id: chapter.id,
            title: chapter.title,
          }
        })
      });
    }
  });
  return books;
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      books,
      chapters,
      users,
      completed_chapters
      RESTART IDENTITY CASCADE`
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

//make sure to use with 'makeMaliciousChapter'
function makeMaliciousBook(chapters) {
  return {
    maliciousBook: {
    id: 1,
    title: `<script>console.log('hi!')</script>testing-2`,
    blurb: `<script>console.log('hi!')</script>testing a blurb-2`,
    chapter_order: [1],
    default_book: true,
    published: true,
    date_created: '2029-01-22T16:28:32.615Z',
    date_published: '2029-01-22T16:28:32.615Z',
    date_modified: '2029-01-22T16:28:32.615Z'
    },
    expectedBook: [{
      id: 1,
      title: `&lt;script&gt;console.log('hi!')&lt;/script&gt;testing-2`,
      blurb: `&lt;script&gt;console.log('hi!')&lt;/script&gt;testing a blurb-2`,
      chapter_order: [1],
      default_book: true,
      chapters: [{
        title: `&lt;script&gt;console.log('hi!')&lt;/script&gt;testing`,
        id: 1
      }]
    }]
  }
}

function makeMaliciousChapter() {
  return [{
    id: 1,
    book_id: 1,
    title: `<script>console.log('hi!')</script>testing`,
    content: {
      blocks: [
        {
          text: `<script>console.log('hi!')</script>testing`,
        }
      ]
    },
    date_created: '2029-01-22T16:28:32.615Z',
    date_published: '2029-01-22T16:28:32.615Z',
    date_modified: '2029-01-22T16:28:32.615Z'
  }]
}

module.exports = {
  makeFixtures,
  cleanTables,
  makeAuthHeader,
  makeUsersArray,
  makeBooksArray,
  makeChaptersArray,
  makeCompletedChaptersArray,
  seedTables,
  seedUsers,
  makeExpectedCompChapters,
  makeExpectedChapter,
  makeExpectedBookList,
  makeMaliciousBook,
  makeMaliciousChapter
}