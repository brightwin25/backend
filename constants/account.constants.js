const getAllAccounts = 'SELECT * FROM accounts';
const createAccountQuery = 'INSERT INTO accounts (name,account_number,balance,currency,credit_limit,bill_gen_date,deadline,isDebt,user_id) VALUES (?,?,?,?,?,?,?,?,?)';
const getAccountByIdQuery = 'SELECT * FROM accounts where id = ?';
const updateAccountQuery = 'UPDATE accounts SET name= ?, account_number = ?,  balance = ?, currency = ?, credit_limit = ?, bill_gen_date = ?, deadline= ?, isDebt = ?,user_id = ? where id = ?';
const deleteAccountQuery = 'DELETE from accounts where id = ?';

module.exports = { getAllAccounts, createAccountQuery, getAccountByIdQuery, updateAccountQuery, deleteAccountQuery }