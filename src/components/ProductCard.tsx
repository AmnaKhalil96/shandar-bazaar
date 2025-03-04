
import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product & { isFavorite?: boolean };
  onToggleFavorite?: (productId: number) => void;
}

const ProductCard = ({ product, onToggleFavorite }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const isFavorite = favorites.includes(product.id);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newFavorites = isFavorite
      ? favorites.filter(id => id !== product.id)
      : [...favorites, product.id];
      
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    if (isFavorite) {
      toast.info(`Removed ${product.name} from favorites`);
    } else {
      toast.success(`Added ${product.name} to favorites`);
    }
    
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
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
            className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors ${isFavorite ? 'bg-primary text-white' : ''}`}
            aria-label="Add to wishlist"
            onClick={toggleFavorite}
          >
            <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors"
            aria-label="Quick view"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-4">
        <div className="mb-1">
          <span className="text-sm text-muted-foreground">{product.category}</span>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium mb-2 text-lg leading-tight hover:text-primary transition-colors">{product.name}</h3>
        </Link>
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
          <div>
            <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
            {product.sale && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
