const getAllCategories = 'SELECT * FROM categories';
const createCategoryQuery = 'INSERT INTO categories (name,type,user_id) VALUES (?,?,?)';
const getCategoryByIdQuery = 'SELECT * FROM categories where id = ?';

module.exports = { getAllCategories, createCategoryQuery, getCategoryByIdQuery }