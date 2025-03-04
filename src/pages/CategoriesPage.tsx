
import { useState } from 'react';
import { categories } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">All Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase()}`}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                <p className="text-muted-foreground mb-6">{category.itemCount} Products</p>
                <div className="flex items-center text-primary group">
                  Browse Category
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default CategoriesPage;
