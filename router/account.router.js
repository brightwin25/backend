const express = require('express');
const router = express.Router();

const { createAccountSchema, updateAccountSchema, getAccountByIdSchema } = require('../middleware/joi/Account.joi.middleware');
const { validateSchema } = require('../middleware/joi');
const { getAccountsController, getAccountByIdController, createAccountController, updateAccountController, deleteAccountController } = require('../controller/account.controller');

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getAccountsController);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get Account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", validateSchema(getAccountByIdSchema, 'GET Account by ID'), getAccountByIdController);

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Creates an Account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               balance:
 *                 type: number
 *                 format: float
 *               currency:
 *                 type: string
 *               creditLimit:
 *                 type: integer
 *               billGenDate:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
 *               minBalance:
 *                 type: number
 *                 format: float
 *               isCash:
 *                 type : integer
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', validateSchema(createAccountSchema, 'CREATE Account '), createAccountController);

/**
 * @swagger
 * /accounts:
 *   put:
 *     summary: Updates an Account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               balance:
 *                 type: number
 *                 format: float
 *               currency:
 *                 type: string
 *               creditLimit:
 *                 type: integer
 *               billGenDate:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
 *               minBalance:
 *                 type: number
 *                 format: float
 *               isCash:
 *                 type : integer
 *     responses:
 *       200:
 *         description: Success
 */
router.put('/', validateSchema(updateAccountSchema, 'UPDATE Account'), updateAccountController);

/**
 * @swagger
 * /accounts:
 *   delete:
 *     summary: Deletes an Account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               accountNumber:
 *                 type: integer
 *               balance:
 *                 type: number
 *                 format: float
 *               currency:
 *                 type: string
 *               creditLimit:
 *                 type: integer
 *               billGenDate:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
 *               minBalance:
 *                 type: number
 *                 format: float
 *               isCash:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/', validateSchema(updateAccountSchema, 'DELETE Account'), deleteAccountController);

module.exports = router;