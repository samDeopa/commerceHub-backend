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
// routes/variants.ts
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const variantValidation_1 = require("../validations/variantValidation");
const router = express_1.default.Router();
// Add a variant to a specific product
router.post('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        // Validate the incoming variant data
        const validatedVariantData = variantValidation_1.variantSchema.parse(req.body);
        // If validation succeeds, continue with processing
        const { name, sku, additionalCost, stockCount } = validatedVariantData;
        const variant = { name, sku, additionalCost, stockCount };
        const product = yield db_1.Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        product.variants.push(variant);
        yield product.save();
        res.status(201).json({ message: 'Variant added successfully', data: variant });
    }
    catch (error) {
        console.error('Error validating or adding variant:', error);
        res.status(400).json({ error: 'Invalid variant data' });
    }
}));
// Update a variant of a specific product
router.put('/:productId/:variantId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, variantId } = req.params;
    try {
        // Validate the incoming variant data
        const validatedVariantData = variantValidation_1.variantSchema.parse(req.body);
        // If validation succeeds, continue with processing
        const { name, sku, additionalCost, stockCount } = validatedVariantData;
        const updatedVariant = yield db_1.Product.findOneAndUpdate({ _id: productId, 'variants._id': variantId }, { $set: { 'variants.$.name': name, 'variants.$.sku': sku, 'variants.$.additionalCost': additionalCost, 'variants.$.stockCount': stockCount } }, { new: true });
        if (!updatedVariant) {
            res.status(404).json({ error: 'Variant not found' });
            return;
        }
        res.status(200).json({ message: 'Variant updated successfully', data: updatedVariant.variants.id(variantId) });
    }
    catch (error) {
        console.error('Error validating or updating variant:', error);
        res.status(400).json({ error: 'Invalid variant data' });
    }
}));
// Delete a variant from a specific product
router.delete('/:productId/:variantId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, variantId } = req.params;
    try {
        const updatedProduct = yield db_1.Product.findByIdAndUpdate(productId, { $pull: { variants: { _id: variantId } } }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({ message: 'Variant deleted successfully', data: { productId, variantId } });
    }
    catch (error) {
        console.error('Error deleting variant:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Retrieve all variants of a specific product
router.get('/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const product = yield db_1.Product.findById(productId);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        const variants = product.variants;
        res.status(200).json({ data: variants });
    }
    catch (error) {
        console.error('Error retrieving variants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
