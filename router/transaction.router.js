const express = require('express');
const { getModesController, getAllTransactionsController , createTransactionController} = require('../controller/transaction.controller');
const router = express.Router();

/**
 * @swagger
 * /transactions/modes:
 *   get:
 *     summary: Get all modes
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/modes', getModesController);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getAllTransactionsController);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getAllTransactionsController);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Creates a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *               account:
 *                 type: integer
 *               isIncome:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: success
 */
router.post('/', createTransactionController);

module.exports = router;
