const Joi = require('joi');

const getTransactionsSchema = Joi.object({});

const createTransactionSchema = Joi.object({
    amount: Joi.number()
        .precision(2)
        .required(),
    account: Joi.number()
        .integer()
        .required(),
    isIncome: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0')
        .required(),
    description: Joi.string()
        .allow(null, '')
        .optional(),
    date: Joi.date()
        .required(),
    mode: Joi.number()
        .integer()
        .required(),
    category: Joi.number()
        .integer()
        .required(),
});

const updateTransactionSchema = Joi.object({
    id: Joi.number()
        .integer()
        .required(),
    amount: Joi.number()
        .precision(2)
        .required(),
    account: Joi.number()
        .integer()
        .required(),
    isIncome: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0')
        .required(),
    description: Joi.string()
        .allow(null, '')
        .optional(),
    date: Joi.date()
        .required(),
    mode: Joi.number()
        .integer()
        .required(),
    category: Joi.number()
        .integer()
        .required(),
});

module.exports = {
    getTransactionsSchema,
    createTransactionSchema,
    updateTransactionSchema,
};