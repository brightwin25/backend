const categoryService = require('../service/categories-service');
const throwError = require('../utils/error');
const logger = require('../middleware/logger');

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();
        logger.info('Categories fetched successfully', { data : categories });
        res.json(categories);
    } catch (err) {
        next(err);
    }
}

const createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        logger.info('Category created successfully', category);
        res.json(category);
    } catch (err) {
        next(err);
    }
}

const getCategorieById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategorieById(req.body);
        logger.info('Category fetched successfully');
        res.json(category);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCategories, createCategory, getCategorieById
}