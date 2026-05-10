const express = require('express');
const router = express.Router();

const { getCategories, getCategoryById, createCategory } = require('../controller/categories.controller');
const requestLogger = require('../middleware/request.logger.middleware');
const { categorySchema, getCategoriesSchema } = require('../middleware/joi/category.joi.middleware');
const { validateSchema } = require('../middleware/joi');
const asyncHandler = require('../middleware/async.handler');


router.use(requestLogger);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", validateSchema(getCategoriesSchema), asyncHandler(getCategories));

/**
 * @swagger
 * /categories/{id}:
 *  get:
 *      summary: GET category by ID,
 *      tags: [Categories]
 *      security:
 *       - bearerAuth: []
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
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Creates a category
 *     tags: [Categories]
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
 *               type:
 *                 type: integer
 *     responses:
 *       200:
 *         description: success
 */
router.post('/', validateSchema(categorySchema), createCategory);


module.exports = router;