const express = require('express');
const { getModesController } = require('../controller/transaction.controller');
const router = express.Router();

/**
 * @swagger
 * /transactions/modes:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/modes', getModesController);

module.exports = router;
