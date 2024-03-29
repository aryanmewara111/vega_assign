const PORT = process.env.PORT || 3000; // Setting the port number from environment variables
// or defaulting to 3000

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Food-Delivery-Fees API', // API title
      version: '1.0.0', // API version
      description: 'API for pricing functionalities', // API description
    },
    servers: [
      {
        // Setting the API URL based on the NODE_ENV environment variable
        url: process.env.NODE_ENV === 'production' ? process.env.API_URL : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API route files
  swaggerOptions: {
    // Custom CSS for styling the Swagger UI
    customCss: `
      .swagger-ui .topbar {
        background-color: #2C3E50; /* Change the top bar background color to a deep blue */
      }
      .swagger-ui .info .title {
        font-size: 2em; /* Increase the title font size */
        color: #2C3E50; /* Set the title font color to match the top bar */
      }
      .swagger-ui .info .version {
        font-size: 1.5em; /* Increase the version font size */
        color: #34495E; /* Set the version font color to a darker blue */
      }
      .swagger-ui .info .description {
        font-size: 1.2em; /* Increase the description font size */
        color: #7F8C8D; /* Set the description font color to a soft gray */
      }
      .swagger-ui .opblock .opblock-summary-path {
        font-size: 1.2em; /* Increase the operation summary font size */
        color: #2980B9; /* Set the operation summary font color to a nice blue */
      }
      .swagger-ui .opblock .opblock-summary {
        font-size: 1.1em; /* Increase the operation summary font size */
        color: #34495E; /* Set the operation summary font color to a darker blue */
      }
      .swagger-ui .opblock .opblock-description {
        font-size: 1em; /* Increase the operation description font size */
        color: #7F8C8D; /* Set the operation description font color to a soft gray */
      }
      .swagger-ui .opblock .opblock-params-section .opblock-section-header {
        font-size: 1.1em; /* Increase the parameters section header font size */
        color: #34495E; /* Set the parameters section header font color to a darker blue */
      }
      .swagger-ui .opblock .opblock-responses-title {
        font-size: 1.1em; /* Increase the responses title font size */
        color: #34495E; /* Set the responses title font color to a darker blue */
      }`,
  },
};

module.exports = swaggerOptions; // Exporting the swaggerOptions object for use in other files
