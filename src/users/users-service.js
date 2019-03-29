const Treeize = require('treeize');
const xss = require('xss');
const bcrypt = require('bcryptjs');

const UsersService = {
  getUserInfoById(db, userId) {
    return db
      .from('users AS u')
      .select(
        'u.id ',
        'u.user_name',
        'cc.chapter_id AS completed_chapters:id',
        'cc.date_completed AS completed_chapters:date_completed'
      )
      .fullOuterJoin(
        'completed_chapters AS cc',
        'cc.user_id',
        'u.id'
      )
      .where('u.id', userId);
  },
  insertCompletedChapter(db, newCompletion) {
    return db
      .insert(newCompletion)
      .into('completed_chapters')
      .returning([
        'chapter_id AS id',
        'date_completed'
      ])
      .then(([cc]) => cc);
  },
  hasUserWithUserName(db, user_name) {
    return db('users')
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 6) {
      return 'Password must be longer than 6 characters';
    } else if (password.length > 72) {
      return 'Password must be less than 72 characters';
    } else if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
  },
  serializeUserInfo(userData) {
    const userTree = new Treeize();
    const serializedUser = userData.map(data => {
      return {
        ...data,
        user_name: xss(data.user_name),
      } 
    });
    return userTree.grow(serializedUser).getData()[0];
  },
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
      date_created: user.date_created
    }
  },
  hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
};

module.exports = UsersService;