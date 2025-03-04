
import { useState, useEffect } from 'react';
import { SignUp } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
