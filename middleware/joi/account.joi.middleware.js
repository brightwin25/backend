const Joi = require('joi');

const createAccountSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    compatable_modes: Joi.string().required(),
});

const getAccountByIdSchema = Joi.object({
    id: Joi.number().required(),
})

const updateAccountSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(20).required(),
    amount: Joi.number().required(),
    currency: Joi.string().required(),
    compatable_modes: Joi.string().required(),
});

module.exports = { createAccountSchema, getAccountByIdSchema, updateAccountSchema };