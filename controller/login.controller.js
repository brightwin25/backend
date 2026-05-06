const logger = require("../middleware/logger.middleware");
const { getUserById } = require("../service/user.service");
const { sendFailureResponse } = require("../utils/response-handler");
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
    try {
        const { userId = 0, password = '' } = req.body;
        const user = await getUserById(userId);

        if ((user.password !== password) || !user) {
            return sendFailureResponse(res, {
                code: 401,
                message: 'Incorrect password',
                responseId: 2,
            });
        }
        let data = {
            time: Date(),
            userId
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, jwtSecretKey);
        console.log(token);

        res.json(token);

    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

module.exports = { login }