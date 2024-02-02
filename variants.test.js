// tests/variants.unit.test.ts

describe('Variants API Unit Tests', () => {
    const { Product, Variant } = require( '../dist/db');
    const mongoose = require( 'mongoose');
    const request = require( 'supertest');
    const {app} = require( '../dist/index');
  beforeEach(async () => {
    // Clear the database or perform setup before each test
    await Product.deleteMany({});
    await Variant.deleteMany({});
  });

  it('should add a variant to a specific product', async () => {
    const product = new Product({
      name: 'Sample Product',
      description: 'Product description',
      price: 19.99,
      variants: [],
    });
    await product.save();

    const response = await request(app)
      .post(`/variants/${product._id}`)
      .send({
        name: 'Variant 1',
        sku: 'SKU001',
        additionalCost: 5.0,
        stockCount: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Variant added successfully');
  });

  it('should update a variant of a specific product', async () => {
    const product = new Product({
      name: 'Sample Product',
      description: 'Product description',
      price: 19.99,
      variants: [
        {
          name: 'Variant 1',
          sku: 'SKU001',
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const variantId = product.variants[0]._id;

    const response = await request(app)
      .put(`/variants/${product._id}/${variantId}`)
      .send({
        name: 'Updated Variant',
        sku: 'SKU002',
        additionalCost: 7.0,
        stockCount: 15,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Variant updated successfully');
    expect(response.body.data.name).toBe('Updated Variant');
  });

  it('should delete a variant from a specific product', async () => {
    const product = new Product({
      name: 'Sample Product',
      description: 'Product description',
      price: 19.99,
      variants: [
        {
          name: 'Variant 1',
          sku: 'SKU001',
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const variantId = product.variants[0]._id;

    const response = await request(app).delete(`/variants/${product._id}/${variantId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Variant deleted successfully');
  });
});


describe('Variants API Integration Tests', () => {
    const { Product, Variant } = require( '../dist/db');
const mongoose = require( 'mongoose');
const request = require( 'supertest');
const {app} = require( '../dist/index');
    beforeEach(async () => {
      // Clear the database or perform setup before each test
      await Product.deleteMany({});
    });
  
    it('should add a variant to a specific product', async () => {
      const product = new Product({
        name: 'Sample Product',
        description: 'Product description',
        price: 19.99,
        variants: [],
      });
      await product.save();
  
      const response = await request(app)
        .post(`/variants/${product._id}`)
        .send({
          name: 'Variant 1',
          sku: 'SKU001',
          additionalCost: 5.0,
          stockCount: 10,
        });
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Variant added successfully');
 
    });
  
    it('should update a variant of a specific product', async () => {
      const product = new Product({
        name: 'Sample Product',
        description: 'Product description',
        price: 19.99,
        variants: [
          {
            name: 'Variant 1',
            sku: 'SKU001',
            additionalCost: 5.0,
            stockCount: 10,
          },
        ],
      });
      await product.save();
  
      const variantId = product.variants[0]._id;
  
      const response = await request(app)
        .put(`/variants/${product._id}/${variantId}`)
        .send({
          name: 'Updated Variant',
          sku: 'SKU002',
          additionalCost: 7.0,
          stockCount: 15,
        });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Variant updated successfully');
      expect(response.body.data.name).toBe('Updated Variant');
      
    });
  
    it('should delete a variant from a specific product', async () => {
      const product = new Product({
        name: 'Sample Product',
        description: 'Product description',
        price: 19.99,
        variants: [
          {
            name: 'Variant 1',
            sku: 'SKU001',
            additionalCost: 5.0,
            stockCount: 10,
          },
        ],
      });
      await product.save();
  
      const variantId = product.variants[0]._id;
  
      const response = await request(app).delete(`/variants/${product._id}/${variantId}`);
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Variant deleted successfully');
    });
  });
  