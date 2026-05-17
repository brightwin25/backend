// const  = require('../service/category.service');
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
    const { name = '', amount = 0, currency = '', compatable_modes = '' } = req.body;
    const accountToBeAdded = [amount, currency, compatable_modes, userId];
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
    const { id = -1, name = '', amount = 0, currency = '', compatable_modes = '' } = req.body;
    const accountToBeUpdated = [amount, currency, compatable_modes, userId];
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