const db = require('../config/db');
const {DataTypes} = require('sequelize');

const contactModel = db.define(
    "contact",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true
    }
);

module.exports = contactModel;