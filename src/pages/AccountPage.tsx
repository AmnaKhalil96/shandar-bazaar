
import { useState, useEffect } from 'react';
import { useUser, SignedIn, SignedOut, UserProfile, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Heart, CreditCard, Settings, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src={user?.imageUrl} 
                  alt={user?.fullName || 'User'} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{user?.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <User size={18} />
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <Package size={18} />
                  My Orders
                </button>
                <Link
                  to="/favorites"
                  className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-colors hover:bg-gray-100"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'payment' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <CreditCard size={18} />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 py-3 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} />
                  Account Settings
                </button>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                  <UserProfile 
                    appearance={{
                      elements: {
                        card: 'bg-transparent shadow-none border-0',
                        navbar: 'hidden',
                        navbarMobileMenuButton: 'hidden',
                        headerTitle: 'hidden',
                        headerSubtitle: 'hidden',
                        formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                      }
                    }}
                  />
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                  <div className="text-center py-12 px-4">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="mt-2 text-muted-foreground">When you place orders, they will appear here.</p>
                    <Link to="/categories">
                      <button className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                        Start Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                  <div className="text-center py-12 px-4">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No payment methods</h3>
                    <p className="mt-2 text-muted-foreground">You haven't added any payment methods yet.</p>
                    <button className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label htmlFor="email-notifications" className="font-medium">Email Notifications</label>
                          <input type="checkbox" id="email-notifications" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="order-updates" className="font-medium">Order Updates</label>
                          <input type="checkbox" id="order-updates" defaultChecked className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="promotions" className="font-medium">Promotions and Deals</label>
                          <input type="checkbox" id="promotions" defaultChecked className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center justify-between py-2 px-4 border rounded-lg hover:bg-gray-50">
                          <span className="font-medium">Download Personal Data</span>
                          <span>→</span>
                        </button>
                        <button className="w-full flex items-center justify-between py-2 px-4 border rounded-lg hover:bg-gray-50">
                          <span className="font-medium">Delete Account</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
