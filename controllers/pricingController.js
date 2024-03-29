/* eslint-disable camelcase */

// Import the necessary functions from the pricingService module
const { calculatePrice, createFoodEntry } = require('../services/pricingService');

// Controller function to calculate pricing
exports.calculatePricing = async (req, res) => {
  try {
    // Destructure required data from the request body
    const {
      zone,
      organization_id,
      total_distance,
      item_type,
    } = req.body;

    // Call the calculatePrice function from the pricingService module
    const price = await calculatePrice(zone, organization_id, total_distance, item_type);

    // Check if the price calculation was successful
    if (price.success === true) {
      // If successful, send a 200 response with the calculated price
      res.status(200).json(price);
    } else {
      // If not successful, send a 400 response with the error message
      res.status(400).json(price);
    }
  } catch (error) {
    // If an error occurs, send a 400 response with the error message
    res.status(400).json({ message: error.message });
  }
};

// Controller function to create a food entry
exports.createFoodEntry = async (req, res) => {
  try {
    // Destructure required data from the request body
    const {
      organizationName,
      zone,
      item_type,
      description,
      base_distance_in_km,
      km_price,
      fix_price,
    } = req.body;

    // Call the createFoodEntry function from the pricingService module
    const response = await createFoodEntry(
      organizationName,
      zone,
      item_type,
      description,
      base_distance_in_km,
      km_price,
      fix_price,
    );

    // Check if the food entry creation was successful
    if (response.success === true) {
      // If successful, send a 200 response with a success message and the total price
      res.status(200).json({ success: true, message: 'Pricing structure created successfully', total_price: response.total_price });
    } else {
      // If not successful, send a 400 response with the error message
      res.status(400).json(response);
    }
  } catch (error) {
    // If an error occurs, send a 400 response with the error message
    res.status(400).json({ message: error.message });
  }
};
