const logger = require("../middleware/logger.middleware");
const { getUserById } = require("../service/user.service");
const { sendSuccessResponse, throwError } = require("../utils/response-handler");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        const { userId = 0, password = '' } = req.body;
        const user = await getUserById(userId);

        if ((user.password !== password) || !user) {
            throwError(401, 'User not found or incorrect password')
        }

        let userInfo = {
            time: Date(),
            userId,
            userName: user.name,
            email: user.email,
        }

        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(userInfo, jwtSecretKey);

        sendSuccessResponse(res, {
            responseId: 1,
            code: 200,
            data: { token, userInfo },
            message: 'Login success'
        })

    } catch (error) {
        // logger.error(error.message);
        throw error;
    }
}

module.exports = { login }