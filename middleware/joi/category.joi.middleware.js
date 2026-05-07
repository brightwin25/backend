const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    type: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0').required(),
});


const getCategoriesSchema = Joi.object({
    limit: Joi.number().min(0).max(50).default(10),
    orderBy: Joi.any().required(),
    orderType: Joi.string().valid('asc', 'desc').default('asc'),
});

module.exports = { categorySchema, getCategoriesSchema };