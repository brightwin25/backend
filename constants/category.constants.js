const getAllCategories = 'SELECT * FROM categories';
const createCategoryQuery = 'INSERT INTO categories (name,type,user_id) VALUES (?,?,?)';

module.exports = { getAllCategories, createCategoryQuery }