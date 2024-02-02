"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// MongoDB connection
mongoose_1.default.connect("mongodb+srv://admin_Sam:263387@projects.lvac6nh.mongodb.net/apps");
// Get the default connection
const db = mongoose_1.default.connection;
// Event listeners for connection events
// Connection error
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
// Connection successful
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Schema for Variant
const variantSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    additionalCost: { type: Number, default: 0 },
    stockCount: { type: Number, default: 0 },
});
// Schema for Product with Variant as a subdocument
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    variants: [variantSchema],
});
// Create the Product model
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
const Variant = mongoose_1.default.model('Variant', variantSchema);
exports.Variant = Variant;
