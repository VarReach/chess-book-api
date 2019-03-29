const express = require('express');
const ChaptersService = require('./chapters-service');
const BooksEditorService = require('../editor/books-editor/books-editor-service'); //avoid repeating code, use this
const ChaptersRouter = express.Router();

ChaptersRouter
  .route('/:bookId/chapter/:chapterIndex')
  .get(checkBookExists, (req, res, next) => {
    const chapterOrder = req.book.chapter_order;
    const { chapterIndex } = req.params;
    ChaptersService.getChapterByBookChapterOrderAndChapterIndex(req.app.get('db'),chapterOrder, chapterIndex)
      .then(chapter => {
        if (!chapter) {
          return res.status(404).json({ message: `Chapter with index ${req.params.chapterIndex} in Book ${req.book.id} doesn't exist` });
        }
        return res.json(
          ChaptersService.serializeChapter(
            {
              ...chapter, 
              book_title: req.book.title,
              last_chapter_available: chapterOrder.length
            }
          )
        );
      })
      .catch(err=> {
        next(err);
      });
  });

async function checkBookExists(req, res, next) {
  try {
    const book = await BooksEditorService.getBookById(
      req.app.get('db'),
      req.params.bookId
    );

    if (!book) {
      return res.status(404).json({
        message: `Book ${req.params.bookId} doesn't exist`
      });
    }

    req.book = book;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = ChaptersRouter;