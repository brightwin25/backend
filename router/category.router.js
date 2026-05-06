const express = require('express');
const router = express.Router();

const categoryController = require('../controller/categories.controller');
// const validateCategory = require('../middleware/joi.middleware');
const requestLogger = require('../middleware/request-logger.middleware');
const { categorySchema, getCategoriesSchema } = require('../middleware/joi/category.joi.middleware');
const { validateSchema } = require('../middleware/joi');


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
router.get("/", validateSchema(getCategoriesSchema), categoryController.getCategories);

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

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Creates a category
 *     tags: [Categories]
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
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: success
 */
router.post('/', validateSchema(categorySchema), categoryController.createCategory);


module.exports = router;