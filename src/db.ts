import mongoose from "mongoose";

// MongoDB connection
mongoose.connect(
  "mongodb+srv://admin_Sam:263387@projects.lvac6nh.mongodb.net/apps");

// Get the default connection
const db = mongoose.connection;

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
const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  additionalCost: { type: Number, default: 0 },
  stockCount: { type: Number, default: 0 },
});

// Schema for Product with Variant as a subdocument
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  variants: [variantSchema],
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);
const Variant = mongoose.model('Variant', variantSchema);

// Export the Product model
export  {Product, Variant};
