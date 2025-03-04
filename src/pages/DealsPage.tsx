
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { ArrowRight, Percent, Clock, Tag, Fire } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const DealsPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter sale products
  const saleProducts = products.filter(product => product.sale);
  
  // Create featured deals (just using the first 3 sale products)
  const featuredDeals = saleProducts.slice(0, 3);
  
  // Create flash deals (using next 4 sale products)
  const flashDeals = saleProducts.slice(3, 7);
  
  // Create clearance deals (using next 8 sale products)
  const clearanceDeals = saleProducts.slice(7, 15);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals & Offers</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover amazing discounts on your favorite products. Limited time offers you can't miss!
              </p>
              <Button size="lg" className="group">
                Shop All Deals
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Deal Categories */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button 
                variant={activeTab === 'all' ? 'primary' : 'outline'} 
                onClick={() => setActiveTab('all')}
                className="flex items-center gap-2"
              >
                <Percent className="w-4 h-4" />
                All Deals
              </Button>
              <Button 
                variant={activeTab === 'flash' ? 'primary' : 'outline'} 
                onClick={() => setActiveTab('flash')}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Flash Sales
              </Button>
              <Button 
                variant={activeTab === 'clearance' ? 'primary' : 'outline'} 
                onClick={() => setActiveTab('clearance')}
                className="flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Clearance
              </Button>
            </div>
            
            {/* Featured Deals Banner */}
            {activeTab === 'all' && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <Fire className="text-primary mr-2" /> Featured Deals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredDeals.map((product) => (
                    <div key={product.id} className="relative bg-white rounded-xl overflow-hidden shadow-md group">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 to-transparent z-10 opacity-60"></div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-0 left-0 p-6 z-20 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium mb-3">
                              SAVE {Math.round(20)}%
                            </span>
                            <h3 className="text-white text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-white/90 mb-3">Limited time offer</p>
                          </div>
                          <div className="bg-white text-primary rounded-full p-3 shadow-lg">
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          </div>
                        </div>
                        <Link to={`/product/${product.id}`}>
                          <Button className="mt-6 w-full">
                            Shop Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Flash Sales Section */}
            {(activeTab === 'all' || activeTab === 'flash') && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <Clock className="text-primary mr-2" /> Flash Sales
                  <span className="ml-auto text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Ends in 10:45:30
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {flashDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Clearance Deals Section */}
            {(activeTab === 'all' || activeTab === 'clearance') && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <Tag className="text-primary mr-2" /> Clearance Deals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {clearanceDeals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default DealsPage;
