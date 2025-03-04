
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/ui/Button';
import { products } from '@/lib/data';

const FavoritesPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();
  
  // Get favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter products based on favorites
  const favoriteProducts = products.filter(product => favorites.includes(product.id));
  
  // Toggle favorite status for a product
  const toggleFavorite = (productId: number) => {
    const updatedFavorites = favorites.filter(id => id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
          
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Browse products and add items to your wishlist to keep track of what you love.
              </p>
              <Button onClick={() => navigate('/categories')}>
                Browse Categories
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={{ ...product, isFavorite: true }}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default FavoritesPage;
