// Import Sequelize as the ORM
const Sequelize = require('sequelize');

// Set up dotenv to load .env files
require('dotenv').config();

// If the application is being run through Heroku
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}
// If the application is being run on my local machine
else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
};

// Export the connection to the database.
module.exports = sequelize;