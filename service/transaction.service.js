const { getAccountByIdQuery, updateAccountQuery } = require("../constants/account.constants");
const { getModesQuery, getTransactionsQuery, addTransactionQuery } = require("../constants/transaction.constants");
const logger = require("../middleware/logger.middleware");
const { throwError, sendSuccessResponse } = require("../utils/response-handler");
const { getAll, getItemById, updateItem, createItem } = require("./index.service");
const db = require('../config/db.config');


const getModes = async (res) => {
    await getAll(res, getModesQuery, 'Modes');
}

const getTransactions = async (res) => {
    await getAll(res, getTransactionsQuery, 'Transactions');
}

const createExpense = async (res, transactionData) => {
    logger.info(`Entering into Create expense service with data ${transactionData}`);

    const [[account]] = await db.execute(getAccountByIdQuery, [transactionData.account]);
    logger.info(`Fetched account - ${account}`);

    if (!account) {
        logger.error(`Account not found`);
        throwError(`Account not found`);
    } else if (account.id !== transactionData?.account) {
        logger.error(`Account mismatch, fetched account - ${account} & transaction account id - ${transactionData.account}`);
        throwError(403, `Account mismatch, fetched account - ${account} & transaction account id - ${transactionData.account}`);
    } else if (account.balance < transactionData?.amount) {
        logger.error(`Insufficient balance in account, Amount remaining in account - ${account.balance} & transaction amount - ${transactionData.amount}`);
        throwError(403, `Insufficient balance in account, Amount remaining in account - ${account.balance} & transaction amount - ${transactionData.amount}`);
    } else {
        logger.info(`Adding transaction to account name - ${account.name} of amount - ${transactionData.amount}`);
        const balance = account?.balance - transactionData?.amount;
        const accountToBeUpdated = [account.name, account.account_number, balance, account.currency, account.credit_limit, account.bill_gen_date, account.deadline, account.isDebt, account.user_id, account.id];
        const transactionToBeAdded = [transactionData.amount, transactionData.account, transactionData.isIncome, transactionData.userId]
        await db.execute(updateAccountQuery, accountToBeUpdated);
        const transaction = await db.execute(addTransactionQuery, transactionToBeAdded);
        sendSuccessResponse(res, {
            data: transaction,
            responseId: 1,
            code: 200,
            message: 'Transaction added successfully'
        })
    }
}

module.exports = { getModes, getTransactions, createExpense };