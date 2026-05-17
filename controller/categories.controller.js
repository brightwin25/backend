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
    logger.info('Entering into GET category by ID controller !');
    const categoryId = req.params?.id || -1;
    categoryService.getCategoryById(res, categoryId);
}

const updateCategory = async (req, res, next) => {
    logger.info('Entering into UPDATE category controller !');
    const store = asyncLocalStorage.getStore();
    const userId = store.userId;
    const { id = -1, name = '', type = 0 } = req.body;
    const dataToBeEdited = [name, type, userId, id];
    await categoryService.updateCategory(res, dataToBeEdited);
}

const deleteCategory = async (req, res, next) => {
    logger.info('Entering into DELETE category controller !');
    const { id = -1 } = req.body;
    const dataToBeDeleted = [id];
    await categoryService.deleteCategory(res, dataToBeDeleted);
}

module.exports = {
    getCategories, createCategory, getCategoryById, updateCategory, deleteCategory
}