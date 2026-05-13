const { throwError } = require("../../utils/response-handler");
const logger = require("../logger.middleware");

const validateSchema = (schema, schemaName) => {
    return (req, res, next) => {
        logger.info(`Started validating ${schemaName} !`);

        const source = {
            ...req.params,
            ...req.query,
            ...req.body
        }
        const { value, error } = schema.validate(source, {
            abortEarly: false,
        });

        if (error) {
            throwError(403, error.details.map(err => err.message));
        }

        logger.info(`${schemaName} validated successfully !`);
        next();
    }
}

module.exports = { validateSchema };