const express = require('express');
const router = express.Router();

const {
    getModesController,
    getAllTransactionsController,
    createTransactionController,
    updateTransactionController,
    deleteTransactionController
} = require('../controller/transaction.controller');

const {
    getTransactionsSchema,
    createTransactionSchema,
    updateTransactionSchema,
} = require('../middleware/joi/transaction.joi.middleware.js');

const { validateSchema } = require('../middleware/joi');
const asyncHandler = require('../middleware/async.handler');

/**
 * @swagger
 * /transactions/modes:
 *   get:
 *     summary: Get all transaction modes
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
    '/modes',
    asyncHandler(getModesController)
);

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
router.get(
    '/',
    validateSchema(getTransactionsSchema, 'GET Transactions'),
    asyncHandler(getAllTransactionsController)
);

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 type: object
 *             properties:
 *               amount:
 *                 type: integer
 *               account:
 *                 type: integer
 *               isIncome:
 *                 type: boolean
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               mode:
 *                 type: string
 *               category:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
    '/',
    validateSchema(createTransactionSchema, 'POST Transaction'),
    asyncHandler(createTransactionController)
);

/**
 * @swagger
 * /transactions:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 type: object
 *             properties:
 *               id:
 *                 type: integer
 *               amount:
 *                 type: integer
 *               account:
 *                 type: integer
 *               isIncome:
 *                 type: boolean
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               mode:
 *                 type: string
 *               category:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.put(
    '/',
    validateSchema(updateTransactionSchema, 'UPDATE Transaction'),
    asyncHandler(updateTransactionController)
);

/**
 * @swagger
 * /transactions:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *              schema:
 *                 type: object
 *              properties:
 *               id:
 *                 type: integer
 *               amount:
 *                 type: integer
 *               account:
 *                 type: integer
 *               isIncome:
 *                 type: boolean
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *               mode:
 *                 type: string
 *               category:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.delete(
    '/',
    validateSchema(updateTransactionSchema, 'DELETE Transaction'),
    asyncHandler(deleteTransactionController)
);

module.exports = router;