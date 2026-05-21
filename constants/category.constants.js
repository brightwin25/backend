const getAllCategories = 'SELECT * FROM categories';
const createCategoryQuery = 'INSERT INTO categories (name,type,can_edit,user_id) VALUES (?,?,?,?)';
const getCategoryByIdQuery = 'SELECT * FROM categories where id = ?';
const updateCategoryQuery = 'UPDATE categories SET name = ?, type = ?, can_edit = ?, user_id = ? where id = ?';
const deleteCategoryQuery = 'DELETE from categories where id = ?';

module.exports = { getAllCategories, createCategoryQuery, getCategoryByIdQuery, updateCategoryQuery, deleteCategoryQuery }