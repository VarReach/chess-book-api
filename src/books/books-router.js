const express = require('express');
const BooksService = require('./books-service');

const BooksRouter = express.Router();

BooksRouter
  .route('/')
  .get((req, res, next) => {
    BooksService.getAllBooks(req.app.get('db'))
      .then(books => {
        console.log(books);
        return res.json(BooksService.serializeBooks(books));
      })
      .catch(next);
  });

BooksRouter
  .route('/:bookId/chapters')
  .get((req, res, next) => {
    BooksService.getPublishedChapters(req.app.get('db'), req.params.bookId)
      .then(chapters => {
        return res.json(BooksService.serializeChapters(chapters));
      })
      .catch(next);
  });

module.exports = BooksRouter;