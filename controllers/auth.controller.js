const User = require('../models').user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.signup = async (req, res) => {

    try {
        await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        res.send({ message: 'signup successfull' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        })
        if (!user) {
            return res.status(404).send({ message: "user not available" });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

        if (!isPasswordValid) {
            return res.status(401).send({ accessToken: null, message: "password doesn't match" });
        }

        res.status(200).send({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            accessToken: jwt.sign({ id: user.id }, process.env.jwtSecret, { expiresIn: 3600 })
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};