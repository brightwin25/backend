const logger = require("../middleware/logger.middleware");
const { getModes, getTransactions, createExpense } = require("../service/transaction.service");
const asyncLocalStorage = require("../utils/async-context");
const { sendSuccessResponse } = require("../utils/response-handler");

const getModesController = async (req, res, next) => {
    logger.info('Entering into GET Modes controller !');
    await getModes(res);
}

const getAllTransactionsController = async (req, res, next) => {
    logger.info('Entering into GET all transactions controller !');
    await getTransactions(res);
}

const createTransactionController = async (req, res, next) => {
    logger.info('Entering into CREATE transactions controller !');
    try {
        const store = asyncLocalStorage.getStore();
        const userId = store.userId;
        const { account = -1, amount = -1, isIncome = -1 } = req.body;
        const transactionData = { account, amount, isIncome, userId };
        let result = {};
        result = await createExpense(transactionData);
        const { updatedAccount = {}, transaction = {} } = result || {};
        sendSuccessResponse(res, {
            data: transaction,
            responseId: 1,
            code: 200,
            message: 'Transaction added successfully'
        })
    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}


module.exports = { getModesController, getAllTransactionsController, createTransactionController };