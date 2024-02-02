"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/products.ts
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const productValidation_1 = require("../validations/productValidation");
const router = express_1.default.Router();
// Create a product
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the incoming product data
        const validatedData = productValidation_1.productSchema.parse(req.body);
        // If validation succeeds, continue with processing
        const { name, description, price, variants } = validatedData;
        const newProduct = yield db_1.Product.create({ name, description, price, variants });
        res.status(201).json({ message: "Product added successfully", data: newProduct });
    }
    catch (error) {
        console.error('Error validating or creating product:', error);
        res.status(400).json({ error: 'Invalid product data' });
    }
}));
// Retrieve all products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield db_1.Product.find();
        res.status(200).json({ data: allProducts });
    }
    catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Retrieve a specific product by ID using request parameters
router.get('getById/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const product = yield db_1.Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ data: product });
    }
    catch (error) {
        console.error('Error retrieving product by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Update a specific product by ID using request parameters
router.put('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        // Validate the incoming product data
        const validatedData = productValidation_1.productSchema.parse(req.body);
        // If validation succeeds, continue with processing
        const { name, description, price, variants } = validatedData;
        const updatedProduct = yield db_1.Product.findByIdAndUpdate(productId, { name, description, price, variants }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    }
    catch (error) {
        console.error('Error validating or updating product:', error);
        res.status(400).json({ error: 'Invalid product data' });
    }
}));
// Search products by name, description, or variant name
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    try {
        const products = yield db_1.Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for product description
                { 'variants.name': { $regex: query, $options: 'i' } }, // Case-insensitive search for variant name
            ],
        });
        res.status(200).json({ data: products });
    }
    catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ query: query, error: 'Internal Server Error' });
    }
}));
// Delete a specific product by ID using request parameters
router.delete('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const deletedProduct = yield db_1.Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Product deleted successfully', data: deletedProduct });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
