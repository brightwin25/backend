const db = require('../config/db');
const throwError = require('../middleware/error');

const getCategories = async () => {
    const [categories] = await db.execute('SELECT * FROM categories;');

    if (!categories.length) {
        throwError('Categories not found !', 404);
    }

    return categories;
};

const createCategory = async (data) => {
    const { name = '', type = 0, userId = null } = data;
    const [category] = await db.execute('INSERT INTO categories (name,type,user_id) VALUES (?,?,?)', [
        name, type, userId
    ]);
    // return category[0];
    return { id: category.insertId, name, type, userId };
};

const getCategorieById = async (data) => {
    const { id = 0 } = data;
    const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);

    if (!category) {
        throwError('Category not found with this id', 403);
    }

    return category[0];
}

module.exports = {
    getCategories,
    createCategory,
    getCategorieById
};