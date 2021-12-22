// const config = require("../config/database.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host: process.env.db_host,
        dialect: process.env.db_dialect,
    }
);

const models = {};

models.sequelize = sequelize;

models.user = require("../models/user")(sequelize, Sequelize);

module.exports = models;