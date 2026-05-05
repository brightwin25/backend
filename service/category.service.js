const db = require('../config/db.config');
const { throwError } = require('../utils/response-handler');
const categoryQuery = require('../constants/category.constants');
const service = require('./index.service');
const logger = require('../middleware/logger.middleware');

const getCategories = async () => {
    try {
        return categories = await service.getAll(categoryQuery.getAllCategories);
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

const createCategory = async (data) => {
    try {
        const { name = '', type = 0, userId = null } = data;
        const categoryToBeCreated = [name, type, userId];
        const category = await service.createItem(categoryQuery.createCategoryQuery, categoryToBeCreated);
        return { id: category.id, name, type, userId, rowsAffected: category.rowsAffected };
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

const getCategoryById = async (data) => {
    try {
        const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [data]);
        return category[0];
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getCategories,
    createCategory,
    getCategoryById
};