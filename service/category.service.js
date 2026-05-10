const db = require('../config/db.config');
const { throwError } = require('../utils/response-handler');
const categoryQuery = require('../constants/category.constants');
const service = require('./index.service');
const logger = require('../middleware/logger.middleware');
const { request } = require('express');

const getCategories = async () => {
    return await service.getAll(categoryQuery.getAllCategories);
}

const createCategory = async (res, data) => {
    category = await service.createItem(res, categoryQuery.createCategoryQuery, data, 'Category');
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