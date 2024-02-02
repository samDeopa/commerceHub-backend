// tests/products.unit.test.ts

describe("Products API Unit Tests", () => {
  const { Product, Variant } = require("../dist/db");
  const mongoose = require("mongoose");
  const request = require("supertest");
  const { app } = require("../dist/index");
  beforeEach(async () => {
    // Clear the database or perform setup before each test
    await Product.deleteMany({});
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Sample Product",
        description: "Product description",
        price: 19.99,
        variants: [
          {
            name: "Variant 1",
            sku: "SKU001",
            additionalCost: 5.0,
            stockCount: 10,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product added successfully");
    expect(response.body.data).toHaveProperty("_id");
  });

  it("should retrieve all products", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("should retrieve a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    newProduct = await product.save();
    console.log(newProduct._id);
    const response = await request(app).get(
      `/products/getById/${newProduct._id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Sample Product");
  });

  it("should update a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app)
      .put(`/products/${product._id}`)
      .send({
        name: "Updated Product",
        description: "Updated description",
        price: 24.99,
        variants: [
          {
            name: "Updated Variant",
            sku: "SKU002",
            additionalCost: 7.0,
            stockCount: 15,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product updated successfully");
    expect(response.body.data.name).toBe("Updated Product");
  });

  it("should delete a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app).delete(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully");
  });

  it("should search products by name, description, or variant name", async () => {
    const product1 = new Product({
      name: "Sample Product 1",
      description: "Product description 1",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    const product2 = new Product({
      name: "Sample Product 2",
      description: "Product description 2",
      price: 24.99,
      variants: [
        {
          name: "Variant 2",
          sku: "SKU002",
          additionalCost: 7.0,
          stockCount: 15,
        },
      ],
    });
    await product1.save();
    await product2.save();

    const response = await request(app).get("/products/search?query=Sample");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
  });
});

describe("Products API Integration Tests", () => {
  const { Product, Variant } = require("../dist/db");
  const mongoose = require("mongoose");
  const request = require("supertest");
  const { app } = require("../dist/index");
  beforeEach(async () => {
    // Clear the database or perform setup before each test
    await Product.deleteMany({});
  });

  it("should create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Sample Product",
        description: "Product description",
        price: 19.99,
        variants: [
          {
            name: "Variant 1",
            sku: "SKU001",
            additionalCost: 5.0,
            stockCount: 10,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Product added successfully");
    expect(response.body.data).toHaveProperty("_id");
  });

  it("should retrieve all products", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
  });

  it("should retrieve a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app).get(`/products/getById/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Sample Product");
  });

  it("should update a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app)
      .put(`/products/${product._id}`)
      .send({
        name: "Updated Product",
        description: "Updated description",
        price: 24.99,
        variants: [
          {
            name: "Updated Variant",
            sku: "SKU002",
            additionalCost: 7.0,
            stockCount: 15,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product updated successfully");
    expect(response.body.data.name).toBe("Updated Product");
  });

  it("should delete a specific product by ID", async () => {
    const product = new Product({
      name: "Sample Product",
      description: "Product description",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    await product.save();

    const response = await request(app).delete(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully");
  });

  it("should search products by name, description, or variant name", async () => {
    const product1 = new Product({
      name: "Sample Product 1",
      description: "Product description 1",
      price: 19.99,
      variants: [
        {
          name: "Variant 1",
          sku: "SKU001",
          additionalCost: 5.0,
          stockCount: 10,
        },
      ],
    });
    const product2 = new Product({
      name: "Sample Product 2",
      description: "Product description 2",
      price: 24.99,
      variants: [
        {
          name: "Variant 2",
          sku: "SKU002",
          additionalCost: 7.0,
          stockCount: 15,
        },
      ],
    });
    await product1.save();
    await product2.save();

    const response = await request(app).get("/products/search?query=Sample");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(2);
  });
});
