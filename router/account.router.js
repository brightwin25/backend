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
 *     summary: Creates a Account
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
 *                 type : string
 *               balance: 
 *                 type : integer
 *               currency: 
 *                 type: string
 *               credit_limit:
 *                 type: integer
 *               bill_gen_date:
 *                 type: date
 *               deadline:
 *                 type: date
 *               isDebt:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: success
 */
router.post('/', createAccountController);

/**
 * @swagger
 * /accounts:
 *   put:
 *     summary: Updates a Account
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
 *                 type : integer    
 *               name:
 *                 type: string
 *               amount: 
 *                  type : integer
 *               currency: 
 *                  type : string
 *               compatable_modes: 
 *                  type: string
 *     responses:
 *       200:
 *         description: success
 */
router.put('/', validateSchema(updateAccountSchema, 'UPDATE Account'), updateAccountController);

/**
 * @swagger
 * /accounts:
 *   delete:
 *     summary: Delete all accounts
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
 *                 type : integer    
 *               name:
 *                 type: string
 *               amount: 
 *                  type : integer
 *               currency: 
 *                  type : string
 *               compatable_modes: 
 *                  type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete('/', validateSchema(updateAccountSchema, 'DELETE Account'), deleteAccountController);


module.exports = router;