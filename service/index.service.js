const db = require('../config/db.config');
const logger = require('../middleware/logger.middleware');
const { sendSuccessResponse } = require('../utils/response-handler');

const getAll = async (getAllQuery) => {
    return await db.execute(getAllQuery);
    // return data || [];
}

const createItem = async (res, createItemQuery, itemToBeCreated, itemName) => {
    const [item] = await db.execute(createItemQuery, itemToBeCreated);
    return sendSuccessResponse(res, {
        code: 200,
        responseId: item.rowsAffected === 1 ? 1 : 2,
        data: item,
        message: item.rowsAffected === 1 ? `${itemName} added successfully` : `Unable to add ${itemName}`,
    })
}

module.exports = { getAll, createItem };