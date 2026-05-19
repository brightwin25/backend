const { getAccountByIdQuery, updateAccountQuery } = require("../constants/account.constants");
const { getModesQuery, getTransactionsQuery, addTransactionQuery } = require("../constants/transaction.constants");
const logger = require("../middleware/logger.middleware");
const { throwError, sendSuccessResponse } = require("../utils/response-handler");
const { getAll, updateItem, createItem } = require("./common.service");
const commonService = require('./common.return.service')
const db = require('../config/db.config');


const getModes = async (res) => {
    await getAll(res, getModesQuery, 'Modes');
}

const getTransactions = async (res) => {
    await getAll(res, getTransactionsQuery, 'Transactions');
}

const createExpense = async (transactionData) => {
    logger.info(`Entering into Create expense service with data ${transactionData}`);

    const [account] = await commonService.getItemById(getAccountByIdQuery, transactionData.account, 'Account');
    logger.info(`Fetched account - ${account}`);

    if (!account) {
        logger.error(`Account not found`);
        throwError(`Account not found`);
    } else if (account.id !== transactionData?.account) {
        logger.error(`Account mismatch, fetched account - ${account} & transaction account id - ${transactionData.account}`);
        throwError(403, `Account mismatch, fetched account - ${account} & transaction account id - ${transactionData.account}`);
    } else if ((account.balance < transactionData?.amount) && transactionData?.isIncome === false) {
        logger.error(`Insufficient balance in account, Amount remaining in account - ${account.balance} & transaction amount - ${transactionData.amount}`);
        throwError(403, `Insufficient balance in account, Amount remaining in account - ${account.balance} & transaction amount - ${transactionData.amount}`);
    } else {
        logger.info(`Adding transaction to account name - ${account.name} of amount - ${transactionData.amount}`);
        // let balance;

        const balance = transactionData.isIncome === true ? account?.balance + transactionData?.amount : account?.balance - transactionData?.amount;
        const accountToBeUpdated = [account.name, account.account_number, balance, account.currency, account.credit_limit, account.bill_gen_date, account.deadline, account.isDebt, account.user_id, account.id];
        const transactionToBeAdded = [transactionData.amount, transactionData.account, transactionData.isIncome, transactionData.userId];
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            const updatedAccount = await commonService.updateItem(updateAccountQuery, accountToBeUpdated, 'Account');
            const transaction = await commonService.createItem(addTransactionQuery, transactionToBeAdded, 'Transaction');
            await connection.commit();
            return { updatedAccount, transaction };
        }
        catch (err) {
            logger.error(err.message);
            await connection.rollback();
        }
        finally {
            connection.release();
        }
    }
}

module.exports = { getModes, getTransactions, createExpense };