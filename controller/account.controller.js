const logger = require('../middleware/logger.middleware');
const response = require('../utils/response-handler');
const asyncLocalStorage = require('../utils/async-context');
const { deleteAccount, updateAccount, getAccountById, createAccount, getAccounts } = require('../service/account.service');

const getAccountsController = async (req, res, next) => {
    logger.info('Entering into GET accounts controller !');
    await getAccounts(res);
}

const createAccountController = async (req, res, next) => {
    logger.info('Entering into CREATE accounts controller !');
    const store = asyncLocalStorage.getStore();
    const userId = store.userId;
    const { name = '', accountNumber = '', balance = 0, currency = '', creditLimit = -1, billGenDate = null, deadline = null, nature = '', minBalance = 0, isCash = 0 } = req.body;
    const accountToBeAdded = [name, accountNumber, balance, currency, creditLimit, billGenDate, deadline, nature, minBalance, isCash, userId];
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
    const { id = -1, name = '', accountNumber = '', balance = 0, currency = '', creditLimit = -1, billGenDate = null, deadline = null, nature = '', minBalance = 0, isCash = 0 } = req.body;
    const accountToBeUpdated = [name, accountNumber, balance, currency, creditLimit, billGenDate, deadline, nature, minBalance, isCash, userId, id];
    await updateAccount(res, accountToBeUpdated);
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