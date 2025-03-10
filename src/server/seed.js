
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import models and data
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

// Define models
const ProductSchema = new mongoose.Schema({
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

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  itemCount: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', ProductSchema);
const Category = mongoose.model('Category', CategorySchema);

// Sample data (shortened version of the data.ts content)
const products = [
  {
    name: "Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.8,
    newArrival: true,
    description: "Premium wireless headphones with industry-leading noise cancellation.",
    stock: 15
  },
  {
    name: "Premium Smartphone 256GB",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.9,
    description: "The latest flagship smartphone featuring a stunning AMOLED display.",
    stock: 10
  },
  {
    name: "Men's Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.7,
    sale: true,
    description: "Lightweight and responsive running shoes with enhanced cushioning.",
    stock: 25
  },
  // Add more products as needed
];

const categories = [
  {
    name: "Electronics",
    icon: "laptop",
    itemCount: 1243
  },
  {
    name: "Fashion",
    icon: "shirt",
    itemCount: 856
  },
  {
    name: "Home & Living",
    icon: "home",
    itemCount: 732
  },
  {
    name: "Beauty",
    icon: "sparkles",
    itemCount: 651
  },
  {
    name: "Sports",
    icon: "dumbbell",
    itemCount: 423
  },
  {
    name: "Books",
    icon: "book-open",
    itemCount: 512
  }
];

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    
    try {
      // Clear existing data
      await Product.deleteMany({});
      await Category.deleteMany({});
      
      // Insert new data
      await Product.insertMany(products);
      await Category.insertMany(categories);
      
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
