/* eslint-disable no-undef */
const { calculatePrice } = require('../services/pricingService');
const Item = require('../models/item');
const Organization = require('../models/organization');
const Pricing = require('../models/pricing');
const sequelize = require('../config/db');

// Mocking the database models
jest.mock('../models/item.js', () => ({
  findOne: jest.fn(),
}));

jest.mock('../models/organization.js', () => ({
  findOne: jest.fn(),
}));

jest.mock('../models/pricing.js', () => ({
  findOne: jest.fn(),
}));

jest.mock('../config/db.js', () => ({
  authenticate: jest.fn(),
  sync: jest.fn(),
  transaction: jest.fn(),
}));

// Test suite for database connection
describe('Database Connection', () => {
  it('should establish a database connection', async () => {
    try {
      await sequelize.authenticate();
      // console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
});

// Test suite for calculatePrice function
describe('calculatePrice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Calculate price for perishable item
  it('should calculate the correct price for perishable item', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };
    const mockPricing = {
      base_distance_in_km: 5,
      fix_price: 10,
      km_price: 1.5,
    };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(mockPricing);

    const result = await calculatePrice('central', '005', 12, 'perishable');
    expect(result).toEqual({
      success: true,
      total_price: '20.50',
    });
  });

  // Test case: Calculate price for non-perishable item
  it('should calculate the correct price for non-perishable item', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };
    const mockPricing = {
      base_distance_in_km: 5,
      fix_price: 10,
      km_price: 1,
    };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(mockPricing);

    const result = await calculatePrice('central', '005', 12, 'non-perishable');
    expect(result).toEqual({
      success: true,
      total_price: '17.00',
    });
  });

  // Test case: Return error if required input data is missing
  it('should return error if required input data is missing', async () => {
    const result = await calculatePrice();
    expect(result).toEqual({
      success: false,
      error: 'Missing required input data',
      message: 'Bad request',
    });
  });

  // Test case: Return error if total distance is non-numeric value
  it('should return error if total distance is non numeric  value', async () => {
    const result = await calculatePrice('east', '1', 'string', 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Invalid distance value',
      message: 'Bad request',
    });
  });

  // Test case: Return error if organization not found
  it('should return error if organization not found', async () => {
    Organization.findOne.mockResolvedValueOnce(null);
    const result = await calculatePrice('east', '005', 12, 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Organization not found',
      message: 'Bad request',
    });
  });

  // Test case: Return error if item type is invalid
  it('should return error if item type is invalid', async () => {
    const result = await calculatePrice('east', '1', 12, 'invalidType');
    expect(result).toEqual({
      success: false,
      error: 'Invalid item type',
      message: 'Bad request',
    });
  });

  // Test case: Return error if pricing data not found
  it('should return error if pricing data not found', async () => {
    const mockOrganization = { id: 1 };
    const mockItem = { id: 1 };

    Organization.findOne.mockResolvedValueOnce(mockOrganization);
    Item.findOne.mockResolvedValueOnce(mockItem);
    Pricing.findOne.mockResolvedValueOnce(null);

    const result = await calculatePrice('central', '005', 12, 'perishable');
    expect(result).toEqual({
      success: false,
      error: 'Pricing data not found for the given parameters',
      message: 'Bad request',
    });
  });
});
