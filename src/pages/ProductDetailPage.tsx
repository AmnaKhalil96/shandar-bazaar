
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Button from '@/components/ui/Button';
import { products } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  
  // Find the product by ID
  const product = products.find(p => p.id === Number(productId));
  
  // Get related products (same category)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  
  useEffect(() => {
    // Check if product is in favorites
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites && product) {
      const favorites = JSON.parse(savedFavorites);
      setIsFavorite(favorites.includes(product.id));
    }
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Update localStorage
    const savedFavorites = localStorage.getItem('favorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter((id: number) => id !== product.id);
    } else {
      favorites.push(product.id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <h1 className="text-3xl font-bold mt-2 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5" 
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">{product.rating} out of 5</span>
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.sale && (
                  <span className="ml-3 text-lg text-muted-foreground line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-8">
                {product.description || "No description available for this product."}
              </p>
              
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <span className="mr-4 font-medium">Quantity</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex items-center justify-center gap-2 flex-1"
                    onClick={() => addToCart(product, quantity)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="secondary"
                    className="flex items-center justify-center gap-2"
                    onClick={toggleFavorite}
                  >
                    <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                    {isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="mb-2">
                  <span className="font-medium">Availability:</span>
                  <span className="ml-2 text-primary">
                    {product.stock && product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                  </span>
                </div>
                {product.newArrival && (
                  <div>
                    <span className="font-medium">Collection:</span>
                    <span className="ml-2">New Arrival</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
