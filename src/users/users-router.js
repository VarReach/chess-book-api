const express = require('express');
const UsersService = require('./users-service');
const { requireAuth } = require('../middleware/jwt-auth');
const path = require('path');

const UsersRouter = express.Router();
const bodyParser = express.json();


UsersRouter
  .route('/')
  .get(requireAuth, (req, res, next) => {
    console.log(req.user.id);
    return UsersService.getUserInfoById(req.app.get('db'), req.user.id)
      .then((user) => {
        return res.json(UsersService.serializeUserInfo(user));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { password, user_name } = req.body;

    for (const field of ['user_name', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });
      }
    }
    const passwordError = UsersService.validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }
    return UsersService.hasUserWithUserName(req.app.get('db'), user_name)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName) {
          return res.status(400).json({error: 'User name already taken'});
        }
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword,
            };
            return UsersService.insertUser(req.app.get('db'), newUser)
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

UsersRouter
  .route('/users/completed_chapters/:chapterId')
  .all(requireAuth)
  .post(bodyParser, (req, res, next) => {
    const chapterId = req.params.chapterId;
    const newCompletion = { ids: req.user.id+'-'+chapterId, chapter_id: chapterId, user_id: req.user.id, date_completed: new Date() }
    return UsersService.insertCompletedChapter(req.app.get('db'), newCompletion)
      .then(cc => {
        res
          .status(201)
          .json(cc);
      })
      .catch(next);
  });

module.exports = UsersRouter;