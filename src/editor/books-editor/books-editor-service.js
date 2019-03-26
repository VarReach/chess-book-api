const xss = require('xss');
const Treeize = require('treeize');

const booksEditorService= {
  selectOptions: [
    'b.id',
    'b.title',
    'b.chapter_order',
    'c.id AS chapters:id',
    'c.title AS chapters:title',
    'c.date_created AS chapters:date_created',
    'c.date_published AS chapters:date_published',
    'c.date_modified AS chapters:date_modified'
  ],
  getAllBooks(db) {
    return db
      .from('books')
      .select('*');
  },
  getBookById(db, id) {
    return db
      .from('books')
      .select('*')
      .where('id', id)
      .first();
  },
  getAllChaptersByBookId(db, bookId) {
    if (bookId) {
      return db
        .from('books AS b')
        .leftJoin(
          'chapters AS c',
          'c.book_id',
          'b.id'
        )
        .where('b.id', bookId)
        .select(
          ...this.selectOptions
        );
    } else {
      return db
        .from('books AS b')
        .leftJoin(
          'chapters AS c',
          'c.book_id',
          'b.id'
        )
        .where('b.id', bookId)
        .select(
          ...this.selectOptions
        );
    }
   
  },
  updateBook(db, id, updatedBook) {
    return db
    .from('books')
    .where('id', id)
    .update(updatedBook);
  },
  insertBook(db, newBook) {
    return db
      .insert(newBook)
      .into('books')
      .returning('*')
      .then(([book]) => book)
      .then(book => 
        this.getBookById(db, book.id)
      );
  },
  deleteBook(db, id) {
    return db('books')
      .where('id', id)
      .del();
  },
  serializeBooks(books) {
    return books.map(this.serializeBook);
  },
  serializeBook(book) {
    return {
      ...book,
      title: xss(book.title),
    }
  },
  serializeChapters(chapters) {
    const chaptersTree = new Treeize();
    const serializedChapters = chapters.map(chapter => {
      return {
        ...chapter,
        'chapters:title': xss(chapter['chapters:title']) || null
      }
    });
    return chaptersTree.grow(serializedChapters).getData()[0];
  }
};

module.exports = booksEditorService;