
import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  itemCount: { type: Number, default: 0 }
});

// Check if model exists before creating a new one (for hot-reloading)
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
