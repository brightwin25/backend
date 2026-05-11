const { throwError } = require("../../utils/response-handler");
const logger = require("../logger.middleware");

const validateSchema = (schema, schemaName ,property = 'body') => {
    return (req, res, next) => {
        logger.info(`Started validating ${schemaName} !`);
        const source = property === 'query' ? { ...req.params, ...req.query } : req[property];
        const { value, error } = schema.validate(source, {
            abortEarly: false,
        });

        if (error) {
            throwError(403, error.details.map(err => err.message));
        }

        req[property] = value;

        logger.info(`${schemaName} validated successfully !`);
        next();
    }
}

module.exports = { validateSchema };