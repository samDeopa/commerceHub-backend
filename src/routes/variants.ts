// routes/variants.ts
import express, { Request, Response } from "express";
import { Product } from "../db";
import { variantSchema } from "../validations/variantValidation";

const router = express.Router();

// Add a variant to a specific product
router.post('/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    // Validate the incoming variant data
    const validatedVariantData = variantSchema.parse(req.body);

    // If validation succeeds, continue with processing
    const { name, sku, additionalCost, stockCount } = validatedVariantData;
    const variant = { name, sku, additionalCost, stockCount };

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    product.variants.push(variant);
    await product.save();

    res.status(201).json({ message: 'Variant added successfully', data: variant });
  } catch (error) {
    console.error('Error validating or adding variant:', error);
    res.status(400).json({ error: 'Invalid variant data' });
  }
});

// Update a variant of a specific product
router.put('/:productId/:variantId', async (req: Request, res: Response) => {
  const { productId, variantId } = req.params;
  try {
    // Validate the incoming variant data
    const validatedVariantData = variantSchema.parse(req.body);

    // If validation succeeds, continue with processing
    const { name, sku, additionalCost, stockCount } = validatedVariantData;
    const updatedVariant = await Product.findOneAndUpdate(
      { _id: productId, 'variants._id': variantId },
      { $set: { 'variants.$.name': name, 'variants.$.sku': sku, 'variants.$.additionalCost': additionalCost, 'variants.$.stockCount': stockCount } },
      { new: true }
    );

    if (!updatedVariant) {
      res.status(404).json({ error: 'Variant not found' });
      return;
    }

    res.status(200).json({ message: 'Variant updated successfully', data: updatedVariant.variants.id(variantId) });
  } catch (error) {
    console.error('Error validating or updating variant:', error);
    res.status(400).json({ error: 'Invalid variant data' });
  }
});

// Delete a variant from a specific product
router.delete('/:productId/:variantId', async (req: Request, res: Response) => {
  const { productId, variantId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $pull: { variants: { _id: variantId } } },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json({ message: 'Variant deleted successfully', data: { productId, variantId } });
  } catch (error) {
    console.error('Error deleting variant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve all variants of a specific product
router.get('/:productId', async (req: Request, res: Response) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const variants = product.variants;
    res.status(200).json({ data: variants });
  } catch (error) {
    console.error('Error retrieving variants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
