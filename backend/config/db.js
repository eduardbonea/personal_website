require('dotenv').config();
const Sequelize = require('sequelize');

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, DB_HOST} = process.env;

if (!MYSQL_DATABASE || !MYSQL_USER || !DB_HOST) {
    console.error('.env is missing');
    process.exit(1); 
}

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    dialect : "mysql",
    host : DB_HOST,
    define : {
        charset : "utf8",
        collate : "utf8_general_ci",
        timestamps : true
    }
});

module.exports = sequelize;