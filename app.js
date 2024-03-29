const express = require('express'); // Importing the Express framework
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const swaggerJsdoc = require('swagger-jsdoc'); // Library to generate Swagger documentation
const swaggerUi = require('swagger-ui-express'); // Middleware to serve Swagger UI
const pricingRoutes = require('./routes/pricingRoutes'); // Importing the pricing routes
const swaggerOptions = require('./swaggerOptions'); // Importing Swagger options
require('dotenv').config(); // Loading environment variables from .env file

const app = express(); // Creating an Express application
const PORT = process.env.PORT || 3000; // Setting the port number from environment variables
// or defaulting to 3000

// Middleware
app.use(bodyParser.json()); // Using bodyParser middleware to parse JSON requests
app.use(cors()); // Enabling CORS for all routes

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);// Generating Swagger
//  documentation based on the provided options
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // Serving Swagger UI at /api-docs endpoint

// Routes
app.use('/api/pricing', pricingRoutes); // Using the pricing routes for /api/pricing endpoint

// Redirecting root to Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs'); // Redirecting the root to the Swagger UI
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Logging that the server has started
});
