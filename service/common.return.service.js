const db = require('../config/db.config');
const logger = require('../middleware/logger.middleware');
const { sendSuccessResponse, throwError } = require('../utils/response-handler');

const getAll = async (getAllQuery, itemName) => {
    logger.info(`Entering into common GET ALL service for ${itemName} with query - ${getAllQuery}`);
    const [data] = await db.execute(getAllQuery);
    logger.info('Data fetched from the database', { data });
    return data;
}

const createItem = async (createItemQuery, itemToBeCreated, itemName) => {
    logger.info(`Entering into common CREATE service for ${itemName} with query - ${createItemQuery},${itemToBeCreated}`)
    const [item] = await db.execute(createItemQuery, itemToBeCreated);
    logger.info(`Created ${itemName} - `, { item });
    return item;
}

const getItemById = async (getItemByIdQuery, id, itemName) => {
    logger.info(`Entering into common GET by ID service for ${itemName} with query - ${getItemByIdQuery}, with id ${id}`);
    const [item] = await db.execute(getItemByIdQuery, [id]);
    logger.info('Data fetched from the database', { item });
    return item;
}

const updateItem = async (query, data, itemName) => {
    logger.info(`Entering into common UPDATE service for ${itemName} with query - ${query}, [${data}]`);
    const [item] = await db.execute(query, data);
    logger.info('Updated data from the database', { item });
    return item;
}

const deleteItem = async (deleteItemQuery, data, itemName) => {
    logger.info(`Entering into common DELETE service for ${itemName} with query - ${deleteItemQuery}, [${data}]`);
    const [deletedItem] = await db.execute(deleteItemQuery, data);
    logger.info(`Deleted item - ${itemName}`);
    return deleteItem;
}

module.exports = { getAll, createItem, getItemById, updateItem, deleteItem };