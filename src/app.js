require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const AuthRouter = require('./auth/auth-router');
const UsersRouter = require('./users/users-router');
const BooksRouter = require('./books/books-router');
const ChaptersRouter = require('./chapters/chapters-router');

const ChaptersEditorRouter = require('./editor/chapters-editor/chapters-editor-router');
const BooksEditorRouter = require('./editor/books-editor/books-editor-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/auth', AuthRouter);
app.use('/api/users', UsersRouter);
app.use('/api/books', ChaptersRouter); //note that Chapter is identified by the Book ID and the index -> references chapter_order in book
app.use('/api/books', BooksRouter);

app.use('/api/editor/chapters', ChaptersEditorRouter);
app.use('/api/editor/books', BooksEditorRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = {error: {message: 'server error' }};
  } else {
    response = {message: error.message, error};
  }
  res.status(500).json(response);
}); 

module.exports = app;