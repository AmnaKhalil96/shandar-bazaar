
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { UserPlus } from 'lucide-react';

// Check if Clerk is available
const isClerkAvailable = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const { SignUp } = isClerkAvailable ? require('@clerk/clerk-react') : { SignUp: null };

const SignUpPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
            
            {isClerkAvailable ? (
              <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                afterSignUpUrl="/"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 'border border-input bg-white text-black hover:bg-gray-50',
                  }
                }}
              />
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                    id="password" 
                    type="password" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  />
                </div>
                <Button className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Note</span>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-500">
                  This is a demo app. Authentication is simulated when Clerk API key is not provided.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
