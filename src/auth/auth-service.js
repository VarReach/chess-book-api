const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Treeize = require('treeize');

const authService = {
  getUserWithUsername(db, user_name) {
    return db('users')
      .where({user_name})
      .first();
  },
  getUserInfoById(db, userId) {
    return db
      .from('users AS u')
      .select(
        'u.id ',
        'u.user_name',
        'cc.chapter_id AS completed_chapters:id',
        'cc.date_completed AS completed_chapters:date_completed'
      )
      .leftJoin(
        'completed_chapters AS cc',
        'cc.user_id',
        'u.id'
      )
      .where('u.id', userId);
  },
  serializeUser(user) {
    const userTree = new Treeize();
    const serializedUser = {
      ...user,
      user_name: user.user_name,
    };
    return userTree.grow([serializedUser]).getData()[0];
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