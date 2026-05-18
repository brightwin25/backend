const logger = require('../middleware/logger.middleware');
const response = require('../utils/response-handler');
const asyncLocalStorage = require('../utils/async-context');
const { deleteAccount, updateAccount, getAccountById, createAccount, getAccounts } = require('../service/account.service');

const getAccountsController = async (req, res, next) => {
    logger.info('Entering into GET accounts controller !');
    await getAccounts(res);
}
const createAccountQuery = 'INSERT INTO accounts (name,account_number,balance,currency,credit_limit,bill_gen_date,deadline,isDebt,user_id) VALUES (?,?,?,?,?,?,?,?,?)';

const createAccountController = async (req, res, next) => {
    logger.info('Entering into CREATE accounts controller !');
    const store = asyncLocalStorage.getStore();
    const user_id = store.userId;
    const { name = '', account_number = '', balance = 0, currency = '', credit_limit = -1, bill_gen_date = null, deadline = null, isDebt = -1 } = req.body;
    const accountToBeAdded = [name, account_number, balance, currency, credit_limit, bill_gen_date, deadline, isDebt, user_id];
    await createAccount(res, accountToBeAdded);
}

const getAccountByIdController = async (req, res, next) => {
    logger.info('Entering into GET account by ID controller !');
    const accountId = req.params?.id || -1;
    await getAccountById(res, accountId);
}

const updateAccountController = async (req, res, next) => {
    logger.info('Entering into UPDATE account controller !');
    const store = asyncLocalStorage.getStore();
    const userId = store.userId;
    const { id = -1, name = '', account_number = '', balance = 0, currency = '', credit_limit = -1, bill_gen_date = null, deadline = null, isDebt = -1 } = req.body;
    const accountToBeUpdated = [name, account_number, balance, currency, credit_limit, bill_gen_date, deadline, isDebt, user_id, id];
    await updateAccount(res, dataToBeEdited);
}

const deleteAccountController = async (req, res, next) => {
    logger.info('Entering into DELETE account controller !');
    const { id = -1 } = req.body;
    const accountToBeDeleted = [id];
    await deleteAccount(res, accountToBeDeleted);
}

module.exports = {
    getAccountsController, createAccountController, getAccountByIdController, updateAccountController, deleteAccountController
}