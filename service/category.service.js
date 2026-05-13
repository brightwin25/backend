const db = require('../config/db.config');
const { throwError } = require('../utils/response-handler');
const categoryQuery = require('../constants/category.constants');
const service = require('./index.service');
const logger = require('../middleware/logger.middleware');
const { request } = require('express');

const getCategories = async (res) => {
    service.getAll(res, categoryQuery.getAllCategories, 'Categories');
}

const createCategory = async (res, data) => {
    service.createItem(res, categoryQuery.createCategoryQuery, data, 'Category');
}

const getCategoryById = async (res, data) => {
    service.getItemById(res, categoryQuery.getCategoryByIdQuery, data, 'Category');
}

module.exports = {
    getCategories,
    createCategory,
    getCategoryById
};