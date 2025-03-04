
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, LogIn, UserPlus, Percent } from 'lucide-react';
import Button from './ui/Button';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// Check if Clerk is available before importing
const isClerkAvailable = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

// Conditionally import Clerk components
const ClerkComponents = isClerkAvailable 
  ? require('@clerk/clerk-react')
  : {
      useUser: () => ({ isSignedIn: false, user: null }),
      SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>
    };

const { useUser, SignedIn, SignedOut } = ClerkComponents;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  
  // Only use Clerk if it's available
  const auth = isClerkAvailable ? useUser() : { isSignedIn: false, user: null };
  const { isSignedIn, user } = auth;

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
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors font-medium">
              Deals
            </Link>
            <a href="#products" className="text-foreground hover:text-primary transition-colors font-medium">
              Products
            </a>
          </nav>

          {/* Search and Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Link to="/search">
                <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
              </Link>
            </div>
            <div className="relative group">
              <Link to="/favorites">
                <Heart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
              </Link>
            </div>
            
            {isClerkAvailable ? (
              <>
                <SignedIn>
                  <div className="relative group">
                    <Link to="/account">
                      <User className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                    </Link>
                  </div>
                </SignedIn>
                
                <SignedOut>
                  <div className="flex items-center space-x-2">
                    <Link to="/sign-in">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <LogIn className="w-4 h-4 mr-1" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/sign-up">
                      <Button variant="primary" size="sm" className="flex items-center">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </SignedOut>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <LogIn className="w-4 h-4 mr-1" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" size="sm" className="flex items-center">
                    <UserPlus className="w-4 h-4 mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <div className="relative group">
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
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
                <Link 
                  to="/deals" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <a 
                  href="#products" 
                  className="text-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </a>
                
                {isClerkAvailable ? (
                  <SignedOut>
                    <div className="flex flex-col space-y-2 pt-2">
                      <Link 
                        to="/sign-in" 
                        className="flex items-center text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                      <Link 
                        to="/sign-up" 
                        className="flex items-center text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Sign Up
                      </Link>
                    </div>
                  </SignedOut>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link 
                      to="/sign-in" 
                      className="flex items-center text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                    <Link 
                      to="/sign-up" 
                      className="flex items-center text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </div>
                )}
                
                <div className="flex items-center space-x-6 pt-2">
                  <Link to="/search" onClick={() => setIsMenuOpen(false)}>
                    <Search className="w-5 h-5" />
                  </Link>
                  <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                    <Heart className="w-5 h-5" />
                  </Link>
                  <div className="relative">
                    <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>
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
