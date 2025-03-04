
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Button from './ui/Button';

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 pb-20 flex flex-col justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-3/4 bg-gradient-to-b from-primary/5 to-transparent clip-ellipse -z-10"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 animate-fade-in">
            New Season Arrivals
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-shadow animate-slide-down">
            Discover Your <span className="text-primary">Perfect Style</span> Today
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0 animate-slide-up delay-100">
            Shop the latest trends and discover premium quality products at unbeatable prices. Free shipping on all orders over $50.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-200">
            <Button className="group">
              Shop Now
              <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline">
              View Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex justify-center lg:justify-start gap-8 mt-12 animate-fade-in delay-300">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p className="text-muted-foreground text-sm">Products</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">8k+</p>
              <p className="text-muted-foreground text-sm">Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">99%</p>
              <p className="text-muted-foreground text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80" 
              alt="Fashion Model"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-white shadow-lg rounded-lg p-3 animate-float">
              <div className="text-sm font-bold text-primary">Up to</div>
              <div className="text-2xl font-bold text-foreground">50% OFF</div>
            </div>
          </div>
          
          {/* Background shape */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full blur-md"></div>
          <div className="absolute -left-4 top-1/4 w-24 h-24 bg-accent/20 rounded-full blur-md"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
