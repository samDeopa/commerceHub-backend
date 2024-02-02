// routes/products.ts
import express, { Request, Response } from "express";
import { Product } from "../db";
import { productSchema } from "../validations/productValidation";

const router = express.Router();

// Create a product
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate the incoming product data
    const validatedData = productSchema.parse(req.body);

    // If validation succeeds, continue with processing
    const { name, description, price, variants } = validatedData;
    const newProduct = await Product.create({ name, description, price, variants });

    res.status(201).json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    console.error('Error validating or creating product:', error);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Retrieve all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ data: allProducts });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve a specific product by ID using request parameters
router.get('getById/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error('Error retrieving product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific product by ID using request parameters
router.put('/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    // Validate the incoming product data
    const validatedData = productSchema.parse(req.body);

    // If validation succeeds, continue with processing
    const { name, description, price, variants } = validatedData;
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, variants }, { new: true });
    
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
  } catch (error) {
    console.error('Error validating or updating product:', error);
    res.status(400).json({ error: 'Invalid product data' });
  }
});

// Search products by name, description, or variant name
router.get('/search', async (req: Request, res: Response) => {
    const query = req.query.query as string;
   
    
    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
          { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for product description
          { 'variants.name': { $regex: query, $options: 'i' } }, // Case-insensitive search for variant name
        ],
      });
  
      res.status(200).json({ data: products });
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({query:query, error: 'Internal Server Error' });
    }
  });
  

// Delete a specific product by ID using request parameters
router.delete('/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
