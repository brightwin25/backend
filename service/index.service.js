const db = require('../config/db.config');
const logger = require('../middleware/logger.middleware');

const getAll = async (getAllQuery) => {
    try {
        [data] = await db.execute(getAllQuery);
        return data || [];
    } catch (error) {
        logger.info(error.message);
        throw error;
    }
}

const createItem = async (createItemQuery, itemToBeCreated) => {
    try {
        const [item] = await db.execute(createItemQuery, itemToBeCreated);
        return { id: item.insertId, rowsAffected: item.affectedRows };
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

module.exports = { getAll, createItem };