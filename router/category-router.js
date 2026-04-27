const express = require('express');
const router = express.Router();

const categoryController = require('../controller/categories-controller');
const validateCategory = require('../middleware/joi');
const requestLogger = require('../middleware/request-logger');

router.use(requestLogger);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Fetch all categories from database
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestId:
 *                   type: string
 *                 message:
 *                   type: string
 *                 status:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get("/", categoryController.getCategories);

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *      summary: GET category by ID,
 *      tags: [Categories]
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *      responses:
 *          200:
 *              description :success
 */
router.get("/:id", categoryController.getCategoryById);
router.post('/', validateCategory, categoryController.createCategory);

module.exports = router;