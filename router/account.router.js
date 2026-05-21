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
 *               account_number:
 *                 type: string
 *               balance:
 *                 type: integer
 *               currency:
 *                 type: string
 *               credit_limit:
 *                 type: integer
 *               bill_gen_date:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', createAccountController);

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
 *               account_number:
 *                 type: string
 *               balance:
 *                 type: integer
 *               currency:
 *                 type: string
 *               credit_limit:
 *                 type: integer
 *               bill_gen_date:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
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
 *               account_number:
 *                 type: integer
 *               balance:
 *                 type: integer
 *               currency:
 *                 type: string
 *               credit_limit:
 *                 type: integer
 *               bill_gen_date:
 *                 type: string
 *                 format: date-time
 *               deadline:
 *                 type: string
 *                 format: date-time
 *               nature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/', validateSchema(updateAccountSchema, 'DELETE Account'), deleteAccountController);

module.exports = router;