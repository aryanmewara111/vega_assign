const express = require('express');

const router = express.Router();
const { calculatePricing, createFoodEntry } = require('../controllers/pricingController');

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: Endpoints for dynamic pricing functionalities
 */

/**
 * @swagger
 * /api/pricing/calculate-price:
 *   post:
 *     summary: Calculate delivery costs based on distance, zone, and item type
 *     description: Calculates the delivery cost
 *                  based on the provided distance, zone, organization, and item type.
 *     tags: [Pricing]
 *     parameters:
 *       - in: query
 *         name: zone
 *         schema:
 *           type: string
 *         description: The delivery zone.
 *         required: true
 *         default: 'east'
 *       - in: query
 *         name: organization_id
 *         schema:
 *           type: string
 *         description: The ID of the organization.
 *         required: true
 *         default: '1'
 *       - in: query
 *         name: total_distance
 *         schema:
 *           type: number
 *         description: The total distance of the delivery in kilometers.
 *         required: true
 *         default: 10
 *       - in: query
 *         name: item_type
 *         schema:
 *           type: string
 *         description: The type of the food item ('perishable' or 'non-perishable').
 *         required: true
 *         default: 'non-perishable'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: The delivery zone.
 *                 default: 'east'
 *               organization_id:
 *                 type: string
 *                 description: The ID of the organization.
 *                 default: '1'
 *               total_distance:
 *                 type: number
 *                 description: The total distance of the delivery in kilometers.
 *                 default: 10
 *               item_type:
 *                 type: string
 *                 description: The type of the food item ('perishable' or 'non-perishable').
 *                 default: 'non-perishable'
 *     responses:
 *       200:
 *         description: Successful calculation of price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total_price:
 *                   type: number
 *                   default: 15
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Missing required input data"
 *                   description: Indicates that one or more required input parameters are missing.
 *                 message:
 *                   type: string
 *                   example: "Bad request"
 *                   description: Details about the bad request, if applicable.
 *                 data:
 *                   type: object
 *                   description: Additional data related to the error, such as input parameters.
 *                   properties:
 *                     zone:
 *                       type: string
 *                       example: "east"
 *                       description: The provided zone parameter.
 *                     organization_id:
 *                       type: string
 *                       example: "1"
 *                       description: The provided organization ID parameter.
 *                     total_distance:
 *                       type: number
 *                       example: 10
 *                       description: The provided total distance parameter.
 *                     item_type:
 *                       type: string
 *                       example: "invalidType"
 *                       description: The provided item type parameter.
 *             examples:
 *               example1:
 *                 value:
 *                   success: false
 *                   error: "Invalid distance value"
 *                   message: "Bad request"
 *                   data:
 *                     zone: "east"
 *                     organization_id: "1"
 *                     total_distance: "string"
 *                     item_type: "perishable"
 *               example2:
 *                 value:
 *                   success: false
 *                   error: "Invalid item type"
 *                   message: "Bad request"
 *                   data:
 *                     zone: "east"
 *                     organization_id: "1"
 *                     total_distance: 12
 *                     item_type: "invalidType"
 *               example3:
 *                 value:
 *                   success: false
 *                   error: "Organization not found"
 *                   message: "Bad request"
 *                   data:
 *                     zone: "east"
 *                     organization_id: "005"
 *                     total_distance: 12
 *                     item_type: "perishable"
 *               example4:
 *                 value:
 *                   success: false
 *                   error: "Pricing data not found for the given parameters"
 *                   message: "Bad request"
 *                   data:
 *                     zone: "central"
 *                     organization_id: "005"
 *                     total_distance: 12
 *                     item_type: "perishable"
 *               example6:
 *                 value:
 *                   success: false
 *                   error: "Missing required input data"
 *                   message: "Bad request"
 *                   data:
 *                     zone: "central"
 *                     organization_id: ""
 *                     total_distance: 12
 *                     item_type: ""
 */

/**
 * @swagger
 * /api/pricing/create-entry:
 *   post:
 *     summary: Create a new pricing structure for an organization and item
 *     description: Allows the creation of a new pricing
 *                 structure for an organization and a food item.
 *     tags: [Pricing]
 *     parameters:
 *       - in: query
 *         name: organizationName
 *         schema:
 *           type: string
 *         description: Name of the organization.
 *         required: true
 *         default: 'FoodHut'
 *       - in: query
 *         name: zone
 *         schema:
 *           type: string
 *         description: Zone for the pricing structure.
 *         required: true
 *         default: 'south'
 *       - in: query
 *         name: item_type
 *         schema:
 *           type: string
 *         description: Type of the food item ('perishable' or 'non-perishable').
 *         required: true
 *         default: 'perishable'
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Description of the food item.
 *         required: true
 *         default: 'icecake'
 *       - in: query
 *         name: base_distance_in_km
 *         schema:
 *           type: number
 *         description: Base distance for the pricing structure in km.
 *         required: true
 *         default: 5
 *       - in: query
 *         name: km_price
 *         schema:
 *           type: number
 *         description: Per km price in euros.
 *         required: true
 *         default: 1.5
 *       - in: query
 *         name: fix_price
 *         schema:
 *           type: number
 *         description: Fixed price in euros.
 *         required: true
 *         default: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *                 description: Name of the organization.
 *                 default: 'FoodHut'
 *               zone:
 *                 type: string
 *                 description: Zone for the pricing structure.
 *                 default: 'south'
 *               item_type:
 *                 type: string
 *                 description: Type of the food item ('perishable' or 'non-perishable').
 *                 default: 'perishable'
 *               description:
 *                 type: string
 *                 description: Description of the food item.
 *                 default: 'icecake'
 *               base_distance_in_km:
 *                 type: number
 *                 description: Base distance for the pricing structure in km.
 *                 default: 5
 *               km_price:
 *                 type: number
 *                 description: Per km price in euros.
 *                 default: 1.5
 *               fix_price:
 *                 type: number
 *                 description: Fixed price in euros.
 *                 default: 10
 *     responses:
 *       200:
 *         description: Pricing structure created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                   default: 'Pricing structure created successfully'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 *                   description: Specific error message.
 *                 message:
 *                   type: string
 *                   default: 'Internal server error'
 *                 data:
 *                   type: object
 *                   description: Additional data related to the error, such as input parameters.
 *                   properties:
 *                     organizationName:
 *                       type: string
 *                       example: "FoodHut"
 *                       description: The provided organization name parameter.
 *                     zone:
 *                       type: string
 *                       example: "south"
 *                       description: The provided zone parameter.
 *                     item_type:
 *                       type: string
 *                       example: "invalidType"
 *                       description: The provided item type parameter.
 *                     description:
 *                       type: string
 *                       example: "invalidDescription"
 *                       description: The provided item description parameter.
 *                     base_distance_in_km:
 *                       type: number
 *                       example: 5
 *                       description: The provided base distance parameter.
 *                     km_price:
 *                       type: number
 *                       example: 1.5
 *                       description: The provided per km price parameter.
 *                     fix_price:
 *                       type: number
 *                       example: 10
 *                       description: The provided fixed price parameter.
 *             examples:
 *               example1:
 *                 value:
 *                   success: false
 *                   error: "Missing required input data"
 *                   message: "Bad request"
 *                   data:
 *                     organizationName: ""
 *                     zone: "south"
 *                     item_type: ""
 *                     description: ""
 *                     base_distance_in_km: 5
 *                     km_price: 1.5
 *                     fix_price: 10
 *               example2:
 *                 value:
 *                   success: false
 *                   error: "Invalid numeric values"
 *                   message: "Bad request"
 *                   data:
 *                     organizationName: "FoodHut"
 *                     zone: "south"
 *                     item_type: "perishable"
 *                     description: "icecake"
 *                     base_distance_in_km: "string"
 *                     km_price: 1.5
 *                     fix_price: 10
 *               example3:
 *                 value:
 *                   success: false
 *                   error: "Invalid item type"
 *                   message: "Bad request"
 *                   data:
 *                     organizationName: "FoodHut"
 *                     zone: "south"
 *                     item_type: "invalidType"
 *                     description: "icecake"
 *                     base_distance_in_km: 5
 *                     km_price: 1.5
 *                     fix_price: 10
 */

router.post('/calculate-price', calculatePricing);
router.post('/create-entry', createFoodEntry);

module.exports = router;
