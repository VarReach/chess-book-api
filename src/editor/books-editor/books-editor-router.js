const express = require('express');
const path = require('path');
const BooksEditorService = require('./books-editor-service');
const { requireAdminAuth } = require('../../middleware/jwt-auth');
const bodyParser = express.json();

const booksEditorRouter = express.Router();

booksEditorRouter
  .route('/')
  .all(requireAdminAuth)
  .get((req, res, next) => {
    BooksEditorService.getAllBooks(req.app.get('db'))
      .then(books => {
        res.json(BooksEditorService.serializeBooks(books));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { title } = req.body;
    const newBook = { title };

    if (title == null) {
      return res.status(400).json({ error: `Missing 'title' in request body`});
    }

    BooksEditorService.insertBook(
      req.app.get('db'),
      newBook
    )
      .then(book => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${book.id}`))
          .json(BooksEditorService.serializeBook(book));
      })
      .catch(next);
  });

booksEditorRouter
  .route('/:bookId')
  .all(requireAdminAuth)
  .all(checkBookExists)
  .get((req, res, next) => {
    return res.json(BooksEditorService.serializeBook(req.book));
  })
  .patch(bodyParser, (req, res, next) => {
    const id = req.params.bookId;
    const { title, chapter_order, published } = req.body;
    const updatedBook = { title, chapter_order, published, date_modified: new Date() };

    if (typeof published != 'undefined') {
      (published)
        ? updatedBook.date_published = new Date()
        : updatedBook.date_published = null;
    }

    BooksEditorService.updateBook(
      req.app.get('db'),
      id,
      updatedBook
    )
      .then(() => {
        return res.sendStatus(204);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const id = req.params.bookId;
    BooksEditorService.deleteBook(
      req.app.get('db'),
      id
    )
      .then(() => {
        return res.sendStatus(204);
      })
      .catch(next);
  });

booksEditorRouter
  .route('/:bookId/chapters')
  .all(requireAdminAuth)
  .all(checkBookExists)
  .get((req, res, next) => {
    BooksEditorService.getAllChaptersByBookId(
      req.app.get('db'),
      req.params.bookId
    )
      .then(chapters => {
        res.json(BooksEditorService.serializeChapters(chapters));
      })
      .catch(next);
  });

async function checkBookExists(req, res, next) {
  try {
    const book = await BooksEditorService.getBookById(
      req.app.get('db'),
      req.params.bookId
    );

    if (!book) {
      return res.status(404).json({
        error: `Book ${req.params.bookId} doesn't exist`
      });
    }

    req.book = book;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = booksEditorRouter;