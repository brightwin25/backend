const categoryService = require('../service/categories-service');
// const throwError = require('../middleware/error');
const logger = require('../middleware/logger');
const sendSuccessResponse = require('../utils/helper')

const getCategories = async (req, res, next) => {
    logger.info('Entering into the categories controller');
    try {
        const categories = await categoryService.getCategories();
        logger.info('Categories fetched successfully', { data: categories });
        if (!categories.length) {
            res.status(200).json({
                responseId: 2,
                data: {},
            })
        }
        // res.status(200).json({
        //     responseId: 1,
        //     data: categories,
        //     message: "Categories fetched successfully !",
        // })
        sendSuccessResponse(res, {
            status: 200,
            responseId: 1,
            data: categories,
            message: 'Categories fetched successfully',
        })
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