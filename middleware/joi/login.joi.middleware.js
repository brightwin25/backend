const Joi = require("joi");

const loginSchema = Joi.object({
    userId: Joi.number().required(),
    password: Joi.string().max(20).required(),
});

module.exports = { loginSchema };