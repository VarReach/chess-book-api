const xss = require('xss');
const Treeize = require('treeize');

const BooksService= {
  getAllBooks(db) {
    return db
      .from('books')
      .select(
        'id',
        'title',
        'blurb',
        'default_book'
      )
      .where('published', true);
  },
  getPublishedChapters(db, bookId) {
    return db
      .from('books')
      .select('chapter_order')
      .where('id', bookId)
      .then(([response]) => {
        const {chapter_order} = response;
        return chapter_order;
      })
      .then(chapterOrder => {
        return db
          .from('chapters')
          .select(
            'id',
            'title',
            'content',
            'date_published'
          )
          .whereIn('id', chapterOrder)
          .andWhere('book_id', bookId)
          .then((chapters) => {
            //sort the chapters in the order they appear in the chapter_order
            return chapters.sort((a,b) => {
              const indexA = chapterOrder.indexOf(a.id);
              const indexB = chapterOrder.indexOf(b.id);
              return indexA < indexB ? -1 : (indexA === indexB ? 0 : 1);
            });
          });
      });
  },
  getChapterByIndex(db, chapterIndex) {
    return db
      .from('chapters')
      .select(
        'id',
        'article_order'
      )
      .where('index', chapterIndex)
      .first();
  },
  serializeBook(book) {
    return {
      ...book,
      title: xss(book.title),
      blurb: xss(book.blurb)
    }
  },
  serializeBooks(books) {
    return books.map(book => 
      this.serializeBook(book)
    );
  },
  serializeChapters(chapters) {
    return chapters.map(chapter => {
      return this.serializeChapter(chapter);
    });
  },
  serializeChapter(chapter) {
    return {
      ...chapter,
      title: xss(chapter.title)
    }
  }
};

module.exports = BooksService;