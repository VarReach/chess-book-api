const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Treeize = require('treeize');
const xss = require('xss');

const authService = {
  getUserWithUsername(db, user_name) {
    return db('users')
      .where({user_name})
      .first();
  },
  serializeUser(userData) {
    const userTree = new Treeize();
    const serializedUser = userData.map(data => {
      return {
        ...data,
        user_name: xss(data.user_name),
      } 
    });
    return userTree.grow(serializedUser).getData()[0];
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':');
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256'
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  }
};

module.exports = authService;