const getAllAccounts = 'SELECT * FROM accounts';
const createAccountQuery = 'INSERT INTO accounts (amount,currency,compatable_modes,user_id) VALUES (?,?,?)';
const getAccountByIdQuery = 'SELECT * FROM accounts where id = ?';
const updateAccountQuery = 'UPDATE accounts SET amount = ?, currency = ?, compatable_modes = ?, user_id = ? where id = ?';
const deleteAccountQuery = 'DELETE from accounts where id = ?';

module.exports = { getAllAccounts, createAccountQuery, getAccountByIdQuery, updateAccountQuery, deleteAccountQuery }