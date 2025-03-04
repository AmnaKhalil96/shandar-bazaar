import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/data';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get favorites from localStorage
  const [favorites, setFavorites] = useState<number[]>([]);
  
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
  
  // Update query params when search query changes
  useEffect(() => {
    if (searchQuery) {
      queryParams.set('q', searchQuery);
    } else {
      queryParams.delete('q');
    }
    
    const newUrl = `${location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, location.pathname]);
  
  // Filter products based on search query and filters
  const filteredProducts = products.filter(product => {
    // Search query filter
    const matchesQuery = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === '' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesQuery && matchesCategory && matchesPrice;
  });
  
  // Toggle favorite status for a product
  const toggleFavorite = (productId: number) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with new search query
    queryParams.set('q', searchQuery);
    navigate(`/search?${queryParams.toString()}`);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 2000]);
    setSearchQuery('');
    navigate('/search');
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
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6">Search Products</h1>
            
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <Button type="submit">Search</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </form>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters - Desktop */}
            <div className={`hidden md:block`}>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="mr-2"
                      />
                      All Categories
                    </label>
                    
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.name}
                          onChange={() => setSelectedCategory(category.name)}
                          className="mr-2"
                        />
                        {category.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 bg-white z-50 p-6 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category-mobile"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="mr-2"
                      />
                      All Categories
                    </label>
                    
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === category.name}
                          onChange={() => setSelectedCategory(category.name)}
                          className="mr-2"
                        />
                        {category.name}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
            
            {/* Products */}
            <div className="md:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-8">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <p className="mb-6 text-muted-foreground">
                    Showing {filteredProducts.length} results {searchQuery && `for "${searchQuery}"`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={{ ...product, isFavorite: favorites.includes(product.id) }}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
