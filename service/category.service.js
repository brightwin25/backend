const db = require('../config/db');
const { throwError } = require('../utils/response-handler');

const getCategories = async () => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories');
        return categories;
    } catch (err) {
        throw err;
    }
};

const createCategory = async (data) => {
    try {
        const { name = '', type = 0, userId = null } = data;
        const [category] = await db.execute('INSERT INTO categories (name,type,user_id) VALUES (?,?,?)', [
            name, type, userId
        ]);
        if (!category.insertId) {
            throwError(500, "Category not created");
        }
        return { id: category.insertId, name, type, userId };
    } catch (err) {
        throw err;
    }
};

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