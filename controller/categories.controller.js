const categoryService = require('../service/category.service');
const logger = require('../middleware/logger.middleware');
const response = require('../utils/response-handler');
const asyncLocalStorage = require('../utils/async-context');

const getCategories = async (req, res, next) => {
    logger.info('Entering into GET categories controller !');
    categoryService.getCategories(res);
}

const createCategory = async (req, res, next) => {
    try {
        logger.info('Entering into CREATE categories controller !');
        const store = asyncLocalStorage.getStore();
        const userId = store.userId;
        const { name = '', type = 0 } = req.body;
        const dataToBeAdded = [name, type, userId];
        categoryService.createCategory(res, dataToBeAdded);
    } catch (err) {
        next(err);
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params?.id || -1;
        const category = await categoryService.getCategoryById(categoryId);
        if (!category) {
            return response.sendSuccessResponse(res, {
                code: 200,
                responseId: 2,
                data: null,
                message: `No category found with this id ${categoryId}`,
            })
        }
        return response.sendSuccessResponse(res, {
            code: 200,
            responseId: 1,
            data: category,
            message: 'Category fetched successfully',
        })
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getCategories, createCategory, getCategoryById
}