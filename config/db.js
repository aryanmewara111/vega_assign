// Import Sequelize module
const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Check if the application is running in production environment
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Sequelize instance with the database URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // Specify the dialect as 'postgres'
  dialect: 'postgres',
  // Disable logging to the console
  logging: false,
  // Configure dialect options, including SSL for production environment
  dialectOptions: {
    ssl: isProduction ? { require: true, rejectUnauthorized: false } : false,
  },
});

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    // Log success message if the connection is established
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // Log error message if the connection fails
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize instance
module.exports = sequelize;
