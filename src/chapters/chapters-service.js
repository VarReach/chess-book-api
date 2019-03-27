const xss = require('xss');

const ChaptersService= {
  getChapterByBookChapterOrderAndChapterIndex(db, chapterOrder, chapterIndex) {
    const chapterId = chapterOrder[chapterIndex-1] || null; //off by 1 joy, null is necessary to avoid bad request;
    return db
      .from('chapters')
      .select(
        'id',
        'title',
        'content',
        'date_published'
      )
      .where('id', chapterId)
      .first();
  },
  serializeContent(content) {
    return (
      content 
      ? {
          ...content,
          blocks: content.blocks.map(cBlock => {
            return {...cBlock, text: xss(cBlock.text)}
          })
        }
      : null
    );
  },
  serializeChapter(chapter) {
    return {
      ...chapter,
      title: xss(chapter.title),
      book_title: xss(chapter.book_title),
      content: this.serializeContent(chapter.content)
    }
  }
};

module.exports = ChaptersService;