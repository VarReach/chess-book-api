const express = require('express');
const BooksService = require('./books-service');

const BooksRouter = express.Router();

BooksRouter
  .route('/')
  .get((req, res, next) => {
    BooksService.getAllBooks(req.app.get('db'))
      .then(books => {
        return res.json(BooksService.serializeBooks(books));
      })
      .catch(err=> {
        next(err);
      });
  });

module.exports = BooksRouter;