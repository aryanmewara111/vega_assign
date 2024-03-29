const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

// Define the Item model using Sequelize
class Item extends Model {}

// Initialize the Item model with the specified attributes and options
Item.init({
  // Define the 'type' attribute with ENUM values 'perishable' and 'non-perishable'
  type: {
    type: DataTypes.ENUM('perishable', 'non-perishable'),
    allowNull: false, // The type cannot be null
  },
  // Define the 'description' attribute as a string
  description: {
    type: DataTypes.STRING,
    allowNull: false, // The description cannot be null
  },
}, {
  sequelize, // Pass the sequelize instance
  modelName: 'Item', // Model name
  timestamps: false, // Disable createdAt and updatedAt columns
});

// Export the Item model
module.exports = Item;
