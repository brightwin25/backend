const categoryService = require('../service/category.service');
const logger = require('../middleware/logger.middleware');
const response = require('../utils/response-handler');
const asyncLocalStorage = require('../utils/async-context');

const getCategories = async (req, res, next) => {
    const [categories] = await categoryService.getCategories();

    return response.sendSuccessResponse(res, {
        code: 200,
        responseId: categories.length ? 1 : 2,
        data: categories,
        message: categories.length ? 'Categories fetched successfully' : 'Categories not found',
    });
}

const createCategory = async (req, res, next) => {
    try {
        const store = asyncLocalStorage.getStore();
        const userId = store.userId;
        const { name = '', type = 0 } = req.body;
        const dataToBeAdded = [name, type, userId];
        const category = await categoryService.createCategory(res, dataToBeAdded);
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