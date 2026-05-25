const getModesQuery = 'SELECT * from modes';
const getTransactionsQuery = 'SELECT * FROM transactions';
const addTransactionQuery = 'INSERT INTO transactions (amount, account, is_income, description, date, mode, category, user_id) values (?,?,?,?,?,?,?,?)';
const updateTransactionQuery = 'UPDATE transactions SET amount = ?, account = ?, is_income = ?, description = ?, date = ?, mode = ?, category = ?, user_id = ? WHERE id = ?';
const deleteTransactionQuery = 'DELETE FROM transactions WHERE id = ?';

module.exports = { getModesQuery, getTransactionsQuery, addTransactionQuery, updateTransactionQuery, deleteTransactionQuery };