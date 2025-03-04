
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  sale?: boolean;
  newArrival?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  itemCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.8,
    newArrival: true
  },
  {
    id: 2,
    name: "Premium Smartphone 256GB",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.9
  },
  {
    id: 3,
    name: "Men's Running Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.7,
    sale: true
  },
  {
    id: 4,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 5,
    name: "Designer Handbag",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    rating: 4.8,
    sale: true
  },
  {
    id: 6,
    name: "Bluetooth Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 7,
    name: "4K Smart TV 55-inch",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.7,
    newArrival: true
  },
  {
    id: 8,
    name: "Professional Camera DSLR",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    rating: 4.9
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
