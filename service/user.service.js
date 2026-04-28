const db = require('../config/db');
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

const getuserById = async (data) => {
  const [user] = await db.execute('SELECT * FROM users WHERE id = ?', [data]);

  if (!user.length) {
    throwError(404, `User not found with this id - ${data}`);
  }
  return user[0];
}

module.exports = {
  createUser,
  getUsers,
  getuserById
};