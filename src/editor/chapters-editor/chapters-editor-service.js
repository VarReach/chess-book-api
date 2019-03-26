const xss = require('xss');
const Treeize = require('treeize');

const ChaptersEditorService= {
  getChapterById(db, id) {
    return db
      .from('chapters')
      .select('*')
      .where('id', id)
      .first();
  },
  updateChapter(db, id, newChapter) {
    return db('chapters')
      .where('id', id)
      .update(newChapter);
  },
  deleteChapter(db, id) {
    return db
      .from('chapters')
      .where('id', id)
      .del();
  },
  insertChapter(db, newChapter) {
    return db
      .insert(newChapter)
      .into('chapters')
      .returning('*')
      .then(([chapter]) => chapter)
      .then(chapter => 
        this.getChapterById(db, chapter.id)
      );
  },
  serializeChapter(chapter) {
    return {
      ...chapter,
      title: xss(chapter.title)
    }
  }
};

module.exports = ChaptersEditorService;