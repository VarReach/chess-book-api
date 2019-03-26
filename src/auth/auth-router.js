const express = require('express');
const AuthService = require('./auth-service');
const { requireAuth, requireAdminAuth } = require('../middleware/jwt-auth');

const authRouter = express.Router();
const bodyParser = express.json();

authRouter
  .get('/users', requireAuth, (req, res, next) => {
    return AuthService.getUserInfoById(req.app.get('db'), req.user.id)
      .then(([user]) => {
        return res.json(AuthService.serializeUser(user))
      })
      .catch(next);
  })
  .post('/login', bodyParser, verifyUser, (req, res, next) => {
    const dbUser = req.dbUser;
    const sub = dbUser.user_name;
    let payload = { user_id: dbUser.id };
    dbUser.perms && (payload.permissions = dbUser.perms);
    res.send({
      authToken: AuthService.createJwt(sub, payload)
    });
  })
  .post('/refresh', requireAuth, (req, res) => {
    const sub = req.user.user_name;
    const payload = { user_id: req.user.id };
    res.send({
      authToken: AuthService.createJwt(sub, payload),
    });
  });


async function verifyUser(req, res, next) {
  //verify login info
  try {
    const { user_name, password } = req.body;
    const loginUser = { user_name, password };
    //verify each key has a value
    for (const key in loginUser) {
      if (loginUser[key] == null) {
        return res.status(400).json({ error: `Missing '${key}' in request body` });
      }
    }
    const dbUser = await AuthService.getUserWithUsername(
      req.app.get('db'),
      loginUser.user_name
    )
      .then(dbUser => {
        //confirm user exists
        if (!dbUser) {
          return res.status(401).json({ error: 'Unauthorized request' });
        }

        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(passComparisonMatch => {
            if (!passComparisonMatch) {
              return res.status(401).json({ error: 'Unauthorized request' });
            }
            req.dbUser = dbUser;
            next();
          });
      });
  } catch(error) {
    next(error);
  }
}

module.exports = authRouter;