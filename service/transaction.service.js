const { getModesQuery } = require("../constants/transaction.constants");
const { getAll } = require("./index.service")

const getModes = async (res) => {
    await getAll(res, getModesQuery, 'Modes');
}

module.exports = { getModes };