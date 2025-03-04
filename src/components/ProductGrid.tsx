
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '@/lib/data';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Sports', 'Books'];
  
  // Filter products based on active category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/categories">
            <Button 
              variant="outline" 
              className="mx-auto group"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
