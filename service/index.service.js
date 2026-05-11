const db = require('../config/db.config');
const logger = require('../middleware/logger.middleware');
const { sendSuccessResponse } = require('../utils/response-handler');

const getAll = async (res, getAllQuery, itemName) => {
    logger.info(`Entering into common GET ALL service for ${itemName} with query - ${getAllQuery}`)
    const [data] = await db.execute(getAllQuery);
    logger.info('Data fetched from the database', { data });
    return sendSuccessResponse(res, {
        code: 200,
        responseId: data.length ? 1 : 2,
        data: data,
        message: data.length ? `${itemName} fetched successfully` : `${itemName} not found`,
    });
}

const createItem = async (res, createItemQuery, itemToBeCreated, itemName) => {
    logger.info(`Entering into common CREATE service for ${itemName} with query - ${createItemQuery},${itemToBeCreated}`)
    const [item] = await db.execute(createItemQuery, itemToBeCreated);
    logger.info(`Create ${itemName} - `, { item });
    return sendSuccessResponse(res, {
        code: 200,
        responseId: item.rowsAffected === 1 ? 1 : 2,
        data: item,
        message: item.rowsAffected === 1 ? `${itemName} added successfully` : `Unable to add ${itemName}`,
    })
}

module.exports = { getAll, createItem };