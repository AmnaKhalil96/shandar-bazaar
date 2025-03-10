
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from './ui/Button';
import { Link } from 'react-router-dom';
import { fetchProducts } from '@/services/api';
import { Product } from '@/lib/data';

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];
  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback to static data if API returns empty
          const { products: staticProducts } = await import('@/lib/data');
          setProducts(staticProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static data on error
        const { products: staticProducts } = await import('@/lib/data');
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
    
    getProducts();
  }, []);
  
  // Filter products based on active category
  const filteredProducts = activeCategory === 'All' 
    ? products.slice(0, 8) // Only show first 8 products for All category
    : products.filter(product => product.category === activeCategory).slice(0, 8);

  return (
    <section id="products" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-medium text-primary mb-2">FEATURED PRODUCTS</h2>
            <h3 className="text-3xl font-bold text-foreground">Trending Products</h3>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            {categories.map((category) => (
              <button 
                key={category}
                className={`${
                  activeCategory === category 
                    ? 'text-primary border-b-2 border-primary font-medium' 
                    : 'text-muted-foreground hover:text-primary transition-colors'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link to="/products">
            <Button 
              variant="outline" 
              className="group"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link to="/dashboard">
            <Button variant="primary">
              Admin Dashboard
            </Button>
          </Link>
          
          <Link to="/user-dashboard">
            <Button variant="secondary">
              My Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
