
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  sale?: boolean;
  newArrival?: boolean;
  isFavorite?: boolean;
  description?: string;
  stock?: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  itemCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.8,
    newArrival: true,
    description: "Premium wireless headphones with industry-leading noise cancellation, crystal-clear sound quality, and up to 30 hours of battery life.",
    stock: 15
  },
  {
    id: 2,
    name: "Premium Smartphone 256GB",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.9,
    description: "The latest flagship smartphone featuring a stunning AMOLED display, powerful processor, and professional-grade camera system.",
    stock: 10
  },
  {
    id: 3,
    name: "Men's Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.7,
    sale: true,
    description: "Lightweight and responsive running shoes with enhanced cushioning and support, perfect for daily training and long-distance runs.",
    stock: 25
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.6,
    description: "Advanced smartwatch with always-on display, health monitoring features, and seamless integration with your smartphone.",
    stock: 18
  },
  {
    id: 5,
    name: "Designer Handbag",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.8,
    sale: true,
    description: "Elegant designer handbag crafted from premium materials with multiple compartments and a stylish, timeless design.",
    stock: 7
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.5,
    description: "Waterproof portable speaker with 360° sound, 12-hour battery life, and rugged design for outdoor adventures.",
    stock: 30
  },
  {
    id: 7,
    name: "4K Smart TV 55-inch",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.7,
    newArrival: true,
    description: "Crystal-clear 4K resolution smart TV with HDR support, built-in streaming apps, and voice control capabilities.",
    stock: 12
  },
  {
    id: 8,
    name: "Professional Camera DSLR",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.9,
    description: "High-performance DSLR camera with full-frame sensor, 4K video recording, and advanced autofocus system for professional photographers.",
    stock: 5
  },
  {
    id: 9,
    name: "Ergonomic Office Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1589384113869-541a3903ccd4?auto=format&fit=crop&w=800&q=80",
    category: "Home & Living",
    rating: 4.6,
    description: "Adjustable ergonomic chair with lumbar support, breathable mesh back, and premium cushioning for all-day comfort.",
    stock: 14
  },
  {
    id: 10,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    category: "Home & Living",
    rating: 4.4,
    description: "Modern LED desk lamp with adjustable brightness levels, color temperature settings, and sleek minimalist design.",
    stock: 22
  },
  {
    id: 11,
    name: "Stainless Steel Cookware Set",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?auto=format&fit=crop&w=800&q=80",
    category: "Home & Living",
    rating: 4.7,
    description: "Professional-grade stainless steel cookware set with heat-resistant handles and even heat distribution for perfect cooking results.",
    stock: 8
  },
  {
    id: 12,
    name: "Yoga Mat Premium",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
    category: "Sports",
    rating: 4.5,
    sale: true,
    description: "Eco-friendly, non-slip yoga mat with optimal thickness for joint protection and excellent grip during practice.",
    stock: 20
  },
  {
    id: 13,
    name: "Adjustable Dumbbell Set",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    category: "Sports",
    rating: 4.8,
    description: "Space-saving adjustable dumbbells that replace multiple weights, with quick weight adjustment mechanism and durable construction.",
    stock: 6
  },
  {
    id: 14,
    name: "Organic Face Serum",
    price: 68.99,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4cb6a24?auto=format&fit=crop&w=800&q=80",
    category: "Beauty",
    rating: 4.7,
    newArrival: true,
    description: "Hydrating face serum with organic ingredients, vitamins, and antioxidants for radiant and nourished skin.",
    stock: 15
  },
  {
    id: 15,
    name: "Bestselling Fiction Novel",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    category: "Books",
    rating: 4.9,
    description: "Award-winning bestseller that has captivated readers worldwide with its compelling narrative and unforgettable characters.",
    stock: 35
  },
  {
    id: 16,
    name: "Modern Coffee Table",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80",
    category: "Home & Living",
    rating: 4.5,
    description: "Stylish coffee table with clean lines, durable construction, and ample surface space for your living room.",
    stock: 7
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    icon: "laptop",
    itemCount: 1243
  },
  {
    id: 2,
    name: "Fashion",
    icon: "shirt",
    itemCount: 856
  },
  {
    id: 3,
    name: "Home & Living",
    icon: "home",
    itemCount: 732
  },
  {
    id: 4,
    name: "Beauty",
    icon: "sparkles",
    itemCount: 651
  },
  {
    id: 5,
    name: "Sports",
    icon: "dumbbell",
    itemCount: 423
  },
  {
    id: 6,
    name: "Books",
    icon: "book-open",
    itemCount: 512
  }
];

export const featuredProducts = products.slice(0, 4);
export const newArrivals = products.filter(product => product.newArrival);
export const saleProducts = products.filter(product => product.sale);
