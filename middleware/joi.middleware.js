const Joi = require('joi');
const response = require('../utils/response-handler');

function validateCategory(req, res, next) {
    const joiSchema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        type: Joi.boolean()
            .truthy(1, '1')
            .falsy(0, '0').required(),
        userId: Joi.number().required(),
    });
    const { error, value } = joiSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        return response.sendFailureResponse(res, {
            code: 400,
            responseId: 2,
            message: error.details.map(error => error.message),
        });
    }

    next();
}

const validateGetCategories = (req, res, next) => {
    const joiSchema = Joi.object({
        limit: Joi.number().min(0).max(50).default(10),
        orderBy: Joi.any().required(),
        orderType: Joi.string().valid('asc', 'desc').default('asc'),
    });

    const { error, value } = joiSchema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
    })

    if (error) {
        response.sendFailureResponse(res, {
            code: 403,
            message: error.details.map(error => error.message),
            responseId: 2,
        })
    }

    next();
}

module.exports = validateCategory;