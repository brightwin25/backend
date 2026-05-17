const Joi = require('joi');

const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    type: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0').required(),
});


const getCategoriesSchema = Joi.object({
    limit: Joi.number().min(0).max(50).default(10),
    orderBy: Joi.any(),
    orderType: Joi.string().valid('asc', 'desc').default('asc'),
});

const getCategoryByIdSchema = Joi.object({
    id: Joi.number().required(),
})

const updateCategorySchema = Joi.object({
    id: Joi.number().min(0).required(),
    name: Joi.string().min(3).max(20).required(),
    type: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0').required(),
});

module.exports = { createCategorySchema, getCategoriesSchema, getCategoryByIdSchema, updateCategorySchema };