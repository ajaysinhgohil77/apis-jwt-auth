const User = require("../models").user;

const checkEmailExists = async (req, res, next) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    });
    if (user) {
        res.status(400).send({ message: "user already exists with this email" });
        return;
    }
    next();
};

module.exports = checkEmailExists;
