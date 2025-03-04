
import { ArrowRight, Laptop, Shirt, Home, Sparkles, Dumbbell, BookOpen } from 'lucide-react';
import { categories } from '@/lib/data';
import { Link } from 'react-router-dom';

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'laptop':
      return <Laptop className="w-6 h-6" />;
    case 'shirt':
      return <Shirt className="w-6 h-6" />;
    case 'home':
      return <Home className="w-6 h-6" />;
    case 'sparkles':
      return <Sparkles className="w-6 h-6" />;
    case 'dumbbell':
      return <Dumbbell className="w-6 h-6" />;
    case 'book-open':
      return <BookOpen className="w-6 h-6" />;
    default:
      return <Laptop className="w-6 h-6" />;
  }
};

const CategorySection = () => {
  return (
    <section id="categories" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-medium text-primary mb-2">BROWSE CATEGORIES</h2>
            <h3 className="text-3xl font-bold text-foreground">Popular Categories</h3>
          </div>
          <Link 
            to="/categories" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-4 md:mt-0 group"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {getCategoryIcon(category.icon)}
              </div>
              <h4 className="font-medium text-lg mb-1">{category.name}</h4>
              <p className="text-sm text-muted-foreground">{category.itemCount} Items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
