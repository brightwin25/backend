const db = require('../config/db.config');
const logger = require('../middleware/logger.middleware');
const { sendSuccessResponse, throwError } = require('../utils/response-handler');

const getAll = async (res, getAllQuery, itemName) => {
    logger.info(`Entering into common GET ALL service for ${itemName} with query - ${getAllQuery}`);
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
    logger.info(`Created ${itemName} - `, { item });
    if (item.affectedRows !== 1) {
        throwError(401, `Unable to create ${itemName}`);
    } else {
        return sendSuccessResponse(res, {
            code: 200,
            responseId: item.affectedRows === 1 ? 1 : 2,
            data: item,
            message: item.affectedRows === 1 ? `${itemName} added successfully` : `Unable to add ${itemName}`,
        });
    }
}

const getItemById = async (res, getItemByIdQuery, id, itemName) => {
    logger.info(`Entering into common GET by ID service for ${itemName} with query - ${getItemByIdQuery}, with id ${id}`);
    const [item] = await db.execute(getItemByIdQuery, [id]);
    logger.info('Data fetched from the database', { item });
    return sendSuccessResponse(res, {
        code: 200,
        responseId: item.length === 1 ? 1 : 2,
        data: item,
        message: item.length === 1 ? `${itemName} fetched successfully` : `Unable to fetch ${itemName}`,
    });
}

const updateItem = async (res, query, data, itemName) => {
    logger.info(`Entering into common UPDATE service for ${itemName} with query - ${query}, [${data}]`);
    try {
        const [item] = await db.execute(query, data);
        logger.info('Updated data from the database', { item });
        if (item.affectedRows !== 1) {
            return throwError(401, `Unable to update ${itemName}`);
        } else {
            return sendSuccessResponse(res, {
                code: 200,
                message: `${itemName} updated successfully`,
                responseId: 1,
                data: item,
            })
        }
    } catch (err) {
        logger.error(err.message);
        throwError(401, `Update ${itemName} - Database error. Kindly contact the administrator`)
    }
}

const deleteItem = async (res, deleteItemQuery, data, itemName) => {
    logger.info(`Entering into common DELETE service for ${itemName} with query - ${deleteItemQuery}, [${data}]`);
    try {
        const [deletedItem] = await db.execute(deleteItemQuery, data);
        logger.info(`Deleted item - ${itemName}`);
        if (deletedItem.affectedRows !== 1) {
            throwError(500, `Deletion falied for ${itemName}`);
        } else {
            sendSuccessResponse(res, {
                data: deleteItem,
                code: 200,
                responseId: 1,
                message: `Deletion success on ${itemName}`
            })
        }
    } catch (err) {
        logger.error(err.message);
        throwError(500, `Unable to delete ${itemName}. Contact administrator`);
    }
}

module.exports = { getAll, createItem, getItemById, updateItem, deleteItem };