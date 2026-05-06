const { sendFailureResponse } = require("../../utils/response-handler");

const validateSchema = (schema, property = 'body') => {
    return (req, res, next) => {
        const source = property === 'query' ? { ...req.params, ...req.query } : req[property];
        const { value, error } = schema.validate(source, {
            abortEarly: false,
        });
        console.log(1);

        if (error) {
            sendFailureResponse(res, {
                code: 403,
                message: error.details.map(err => err.message),
                responseId: 2,
            });
        }
        req[property] = value;
        next();
    }
}

module.exports = { validateSchema };