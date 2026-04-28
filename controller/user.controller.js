const userService = require("../service/user.service");

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsers,
    createUser
};