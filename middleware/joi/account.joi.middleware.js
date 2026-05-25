const Joi = require('joi');

const createAccountSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required(),
    accountNumber: Joi.string()
        .allow(null, '')
        .optional(),
    balance: Joi.number()
        .precision(2)
        .required(),
    currency: Joi.string()
        .min(2)
        .max(20)
        .required(),
    creditLimit: Joi.number()
        .integer()
        .min(0)
        .allow(null)
        .optional(),
    billGenDate: Joi.date()
        .iso()
        .allow(null)
        .optional(),
    deadline: Joi.date()
        .iso()
        .allow(null)
        .optional(),
    nature: Joi.string()
        .required(),
    minBalance: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .optional(),
    isCash: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0')
        .required(),
});

const getAccountByIdSchema = Joi.object({
    id: Joi.number().required(),
})

const updateAccountSchema = Joi.object({
    id: Joi.number()
        .required(),
    name: Joi.string()
        .min(3)
        .max(20)
        .required(),
    accountNumber: Joi.string()
        .allow(null, '')
        .optional(),
    balance: Joi.number()
        .precision(2)
        .required(),
    currency: Joi.string()
        .min(2)
        .max(20)
        .required(),
    creditLimit: Joi.number()
        .integer()
        .min(0)
        .allow(null)
        .optional(),
    billGenDate: Joi.date()
        .iso()
        .allow(null)
        .optional(),
    deadline: Joi.date()
        .iso()
        .allow(null)
        .optional(),
    nature: Joi.string()
        .required(),
    minBalance: Joi.number()
        .precision(2)
        .min(0)
        .allow(null)
        .optional(),
    isCash: Joi.boolean()
        .truthy(1, '1')
        .falsy(0, '0')
        .required(),
});

module.exports = { createAccountSchema, getAccountByIdSchema, updateAccountSchema };