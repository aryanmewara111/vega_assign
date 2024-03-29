const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// Define the Organization model using Sequelize
class Organization extends Model {}

// Initialize the Organization model with the specified attributes and options
Organization.init({
  // Define the 'name' attribute as a string
  name: {
    type: DataTypes.STRING,
    allowNull: false, // The name cannot be null
  },
}, {
  sequelize, // Pass the sequelize instance
  modelName: 'Organization', // Model name
  timestamps: false, // Disable createdAt and updatedAt columns
});

// Export the Organization model
module.exports = Organization;
