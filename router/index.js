const express = require('express');
const { login } = require('../controller/login.controller');
const { validateSchema } = require('../middleware/joi');
const { loginSchema } = require('../middleware/joi/login.joi.middleware');
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: To generate token
 *     tags: [Login]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', validateSchema(loginSchema), login);

module.exports = router;