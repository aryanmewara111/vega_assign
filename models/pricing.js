const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const Organization = require('./organization');
const Item = require('./item');

// Define the Pricing model using Sequelize
class Pricing extends Model {}

// Initialize the Pricing model with the specified attributes and options
Pricing.init({
  // Define the 'organization_id' attribute as an INTEGER
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // The organization_id cannot be null
    references: {
      model: Organization, // Reference to the Organization model
      key: 'id', // Reference to the 'id' column in the Organization model
    },
  },
  // Define the 'item_id' attribute as an INTEGER
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // The item_id cannot be null
    references: {
      model: Item, // Reference to the Item model
      key: 'id', // Reference to the 'id' column in the Item model
    },
  },
  // Define the 'zone' attribute as a STRING
  zone: {
    type: DataTypes.STRING,
    allowNull: false, // The zone cannot be null
  },
  // Define the 'base_distance_in_km' attribute as a FLOAT
  base_distance_in_km: {
    type: DataTypes.FLOAT,
    allowNull: false, // The base_distance_in_km cannot be null
  },
  // Define the 'km_price' attribute as a FLOAT
  km_price: {
    type: DataTypes.FLOAT,
    allowNull: false, // The km_price cannot be null
  },
  // Define the 'fix_price' attribute as a FLOAT
  fix_price: {
    type: DataTypes.FLOAT,
    allowNull: false, // The fix_price cannot be null
  },
}, {
  sequelize, // Pass the sequelize instance
  modelName: 'Pricing', // Model name
  timestamps: false, // Disable createdAt and updatedAt columns
});

// Define the associations between Pricing, Organization, and Item models
Organization.hasMany(Pricing, { foreignKey: 'organization_id' });
Item.hasMany(Pricing, { foreignKey: 'item_id' });
Pricing.belongsTo(Organization, { foreignKey: 'organization_id' });
Pricing.belongsTo(Item, { foreignKey: 'item_id' });

// Export the Pricing model
module.exports = Pricing;
