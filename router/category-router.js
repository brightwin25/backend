const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categories-controller');
const validateCategory = require('../middleware/joi');
const requestLogger = require('../middleware/request-logger');

router.use(requestLogger.requestLogger);

router.get("/", categoryController.getCategories);
router.post('/', validateCategory, categoryController.createCategory);

module.exports = router;