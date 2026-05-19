const getModesQuery = 'SELECT * from modes';
const getTransactionsQuery = 'SELECT * FROM transactions';
const addTransactionQuery = 'INSERT INTO transactions (amount, account, is_income, user_id) values (?,?,?,?)';

module.exports = { getModesQuery, getTransactionsQuery, addTransactionQuery };