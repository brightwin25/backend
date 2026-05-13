const express = require('express');
const router = express.Router();

const { getCategories, getCategoryById, createCategory } = require('../controller/categories.controller');
const { getCategoriesSchema, getCategoryByIdSchema, createCategorySchema } = require('../middleware/joi/category.joi.middleware');
const { validateSchema } = require('../middleware/joi');
const asyncHandler = require('../middleware/async.handler');

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
router.get("/", validateSchema(getCategoriesSchema, 'GET Categories'), asyncHandler(getCategories));

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", validateSchema(getCategoryByIdSchema, 'GET Category by ID'), asyncHandler(getCategoryById));

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
router.post('/', validateSchema(createCategorySchema, 'POST category'), createCategory);


module.exports = router;