
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { ArrowRight, Laptop, Shirt, Home, Sparkles, Dumbbell, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { fetchCategories, fetchProducts } from '@/services/api';
import { Product, Category } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'laptop':
      return <Laptop className="w-8 h-8" />;
    case 'shirt':
      return <Shirt className="w-8 h-8" />;
    case 'home':
      return <Home className="w-8 h-8" />;
    case 'sparkles':
      return <Sparkles className="w-8 h-8" />;
    case 'dumbbell':
      return <Dumbbell className="w-8 h-8" />;
    case 'book-open':
      return <BookOpen className="w-8 h-8" />;
    default:
      return <Laptop className="w-8 h-8" />;
  }
};

const CategoriesPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories from MongoDB
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Fetch products from MongoDB
        const productsData = await fetchProducts();
        // Get top rated products
        const topRated = [...productsData]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8);
        setPopularProducts(topRated);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data from MongoDB. Check your connection.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
        
        const timer = setTimeout(() => {
          setIsPageLoaded(true);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    };
    
    fetchData();
  }, [toast]);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">All Categories</h1>
          
          {loading ? (
            // Loading state UI
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg h-80 animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Category Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                  >
                    <div className="relative h-40 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                          {getCategoryIcon(category.icon)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                      <p className="text-muted-foreground mb-4">{category.itemCount} Products</p>
                      <div className="flex items-center text-primary group-hover:text-primary/80">
                        Browse Category
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Featured Products */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {popularProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default CategoriesPage;
