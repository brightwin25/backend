const categoryService = require('../service/category.service');
const logger = require('../middleware/logger.middleware');
const response = require('../utils/response-handler')

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategories();

        return response.sendSuccessResponse(res, {
            code: 200,
            responseId: categories.length ? 1 : 2,
            data: categories,
            message: categories.length ? 'Categories fetched successfully' : 'Categories not found',
        })
    } catch (err) {
        next(err);
    }
}

const createCategory = async (req, res, next) => {
    logger.info('Entering into create category controller');
    try {
        const category = await categoryService.createCategory(req.body);
        return response.sendSuccessResponse(res, {
            code: 200,
            responseId: category.rowsAffected === 1 ? 1 : 2,
            data: category,
            message: category.rowsAffected === 1 ? 'Category added successfully' : 'Unable to add category',
        })
    } catch (err) {
        next(err);
    }
}

const getCategoryById = async (req, res, next) => {
    logger.info('Entering into the get category by id controller');
    try {
        const categoryId = req.params?.id || 0;
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