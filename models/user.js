module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        profilePicture: {
            type: Sequelize.STRING(1000)
        }
    });

    return User;
};