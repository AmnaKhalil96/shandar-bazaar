
import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  sale: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  isFavorite: { type: Boolean, default: false },
  description: { type: String },
  stock: { type: Number, default: 0 }
});

// Check if model exists before creating a new one (for hot-reloading)
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
