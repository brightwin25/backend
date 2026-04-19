const Joi = require('joi');

function validateCategory(data) {
    const joiSchema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        type: Joi.bool().required(),
        userId: Joi.number().required(),
    });
    return joiSchema.validate(data);
}

module.exports = validateCategory;