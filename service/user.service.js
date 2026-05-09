const db = require('../config/db.config');
const throwError = require('../utils/response-handler');

const createUser = async (user) => {
  const { name, email, password } = user;
  const [users] = await db.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)',
    [name, email, password],)
  return users;
};

const getUsers = async () => {
  const [users] = await db.execute('SELECT * FROM users;');
  return users;
};

const getUserById = async (data) => {
  const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [data]);
  if (!user) {
    throwError(403, 'User not found');
  }
  return user[0];
}

module.exports = {
  createUser,
  getUsers,
  getUserById
};