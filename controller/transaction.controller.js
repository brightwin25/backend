const logger = require("../middleware/logger.middleware");
const { getModes } = require("../service/transaction.service");

const getModesController = async (req, res, next) => {
    logger.info('Entering into GET Modes controller !');
    await getModes(res);
}

module.exports = { getModesController };