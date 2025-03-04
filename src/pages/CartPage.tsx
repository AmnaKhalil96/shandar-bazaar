
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import Button from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
      <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
      <Link to="/categories">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shopping
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            renderEmptyCart()
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                          <div className="flex justify-between items-center">
                            <p className="font-bold">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-secondary transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(cartTotal * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/checkout">
                    <Button className="w-full mb-3">Proceed to Checkout</Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="outline" className="w-full">Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default CartPage;
