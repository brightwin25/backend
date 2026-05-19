const db = require('../config/db.config');
const { throwError } = require('../utils/response-handler');
const categoryQuery = require('../constants/category.constants');
const service = require('./common.service');
const logger = require('../middleware/logger.middleware');
const { request } = require('express');

const getCategories = async (res) => {
    await service.getAll(res, categoryQuery.getAllCategories, 'Categories');
}

const createCategory = async (res, data) => {
    await service.createItem(res, categoryQuery.createCategoryQuery, data, 'Category');
}

const getCategoryById = async (res, data) => {
    await service.getItemById(res, categoryQuery.getCategoryByIdQuery, data, 'Category');
}

const updateCategory = async (res, data) => {
    await service.updateItem(res, categoryQuery.updateCategoryQuery, data, 'Category');
}

const deleteCategory = async (res, data) => {
    await service.deleteItem(res, categoryQuery.deleteCategoryQuery, data, 'Category');
}

module.exports = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};