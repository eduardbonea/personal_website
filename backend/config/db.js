require('dotenv').config();
const Sequelize = require('sequelize');

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, DB_HOST, DB_PORT } = process.env;

if (!MYSQL_DATABASE || !MYSQL_USER || !DB_HOST) {
    console.error('Missing required DB environment variables (MYSQL_DATABASE, MYSQL_USER, DB_HOST)');
    process.exit(1);
}

const isLocal = DB_HOST === 'localhost' || DB_HOST === '127.0.0.1';

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    dialectOptions: isLocal
        ? {}
        : { ssl: { rejectUnauthorized: false } },
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true
    }
});

module.exports = sequelize;
