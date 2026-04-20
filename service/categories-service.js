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
    const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [data]);

    if (!category) {
        throwError(404, `Category not found with this id ${data}`);
    }
    return category[0];
}

module.exports = {
    getCategories,
    createCategory,
    getCategorieById
};