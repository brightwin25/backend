const { throwError } = require("../../utils/response-handler");

const validateSchema = (schema, property = 'body') => {
    return (req, res, next) => {
        const source = property === 'query' ? { ...req.params, ...req.query } : req[property];
        const { value, error } = schema.validate(source, {
            abortEarly: false,
        });

        if (error) {
            throwError(403, error.details.map(err => err.message));
        }
        req[property] = value;
        next();
    }
}

module.exports = { validateSchema };