const db = require('../config/db.config');
const { throwError } = require('../utils/response-handler');
const service = require('./common.service');
const logger = require('../middleware/logger.middleware');
const { getAllAccounts, createAccountQuery, getAccountByIdQuery, updateAccountQuery, deleteAccountQuery } = require('../constants/account.constants');

const getAccounts = async (res) => {
    await service.getAll(res, getAllAccounts, 'Accounts');
}

const createAccount = async (res, data) => {
    await service.createItem(res, createAccountQuery, data, 'Account');
}

const getAccountById = async (res, data) => {
    await service.getItemById(res, getAccountByIdQuery, data, 'Account');
}

const updateAccount = async (res, data) => {
    await service.updateItem(res, updateAccountQuery, data, 'Account');
}

const deleteAccount = async (res, data) => {
    await service.deleteItem(res, deleteAccountQuery, data, 'Account');
}

module.exports = {
    getAccounts,
    createAccount,
    getAccountById,
    updateAccount,
    deleteAccount
};