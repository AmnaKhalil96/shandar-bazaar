
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Heart, SlidersHorizontal, ArrowLeft, Grid, List, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { products, categories } from '@/lib/data';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Find the current category
  const currentCategory = categories.find(
    cat => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

  // Filter products by category
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName?.toLowerCase()
  );

  // Handle search and favorites filtering
  const filteredProducts = categoryProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFavorites = showFavoritesOnly ? favorites.includes(product.id) : true;
      return matchesSearch && matchesFavorites;
    });

  // Toggle favorite status for a product
  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set a small delay to ensure smooth animations
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (!currentCategory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Category Header */}
        <div className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <button 
              onClick={() => navigate('/categories')}
              className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentCategory.name}</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    showFavoritesOnly 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={showFavoritesOnly ? "currentColor" : "none"} />
                  Favorites
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-foreground">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filter
                </button>
                <div className="hidden md:flex items-center gap-2 border rounded-md">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-transparent'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-transparent'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          {filteredProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      ...product,
                      isFavorite: favorites.includes(product.id)
                    }}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <div className="md:w-1/4 h-60 md:h-auto overflow-hidden rounded-md">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-3/4 flex flex-col justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <p className="text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center gap-2 mb-2">
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
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="font-bold text-xl">${product.price.toFixed(2)}</span>
                          {product.sale && (
                            <span className="ml-2 text-sm text-muted-foreground line-through">
                              ${(product.price * 1.2).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Heart className="w-4 h-4 mr-2" fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                            Wishlist
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-medium mb-4">No products found</h2>
              <p className="text-muted-foreground mb-8">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setShowFavoritesOnly(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default CategoryPage;
