require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, DB_HOST, DB_PORT, DB_CA } = process.env;

if (!MYSQL_DATABASE || !MYSQL_USER || !DB_HOST) {
    console.error('Missing required DB environment variables (MYSQL_DATABASE, MYSQL_USER, DB_HOST)');
    process.exit(1);
}

const isLocal = DB_HOST === 'localhost' || DB_HOST === '127.0.0.1';

// Build SSL options for remote databases (Aiven)
function getSslOptions() {
    if (isLocal) return undefined;

    // Option 1: certificate pasted into an environment variable
    if (DB_CA) {
        return { ca: DB_CA, rejectUnauthorized: true };
    }

    // Option 2: certificate file committed next to this config
    const caPath = path.join(__dirname, 'ca.pem');
    if (fs.existsSync(caPath)) {
        return { ca: fs.readFileSync(caPath), rejectUnauthorized: true };
    }

    // Fallback: encrypted but not verified
    console.warn('No CA certificate found, connecting without certificate verification');
    return { rejectUnauthorized: false };
}

const ssl = getSslOptions();

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
    dialect: "mysql",
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    dialectOptions: ssl ? { ssl } : {},
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    define: {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: true
    }
});

module.exports = sequelize;
