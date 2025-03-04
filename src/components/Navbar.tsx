import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary transition-transform hover:scale-105">
            ShopDaraz
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors font-medium">
              Categories
            </Link>
            <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </a>
            <a href="#deals" className="text-foreground hover:text-primary transition-colors font-medium">
              Deals
            </a>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
            </div>
            <div className="relative group">
              <Heart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
            </div>
            <div className="relative group">
              <User className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
            </div>
            <div className="relative group">
              <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
              <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                0
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 glass animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <a 
                  href="#products" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                <a 
                  href="#deals" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </a>
                <div className="flex items-center space-x-6 pt-2">
                  <Search className="w-5 h-5" />
                  <Heart className="w-5 h-5" />
                  <User className="w-5 h-5" />
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      0
                    </span>
                  </div>
                </div>
              </nav>
            </div>
          )}
      </div>
    </header>
  );
};

export default Navbar;
