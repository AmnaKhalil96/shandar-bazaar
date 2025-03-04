
import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.sale && (
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
              SALE
            </span>
          )}
          {product.newArrival && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
              NEW
            </span>
          )}
        </div>
        
        {/* Quick Action Buttons */}
        <div 
          className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-sm text-muted-foreground">{product.category}</span>
        </div>
        <h3 className="font-medium mb-2 text-lg leading-tight">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4" 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
          <button 
            className="text-sm font-medium text-primary hover:underline"
            aria-label="View product details"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
