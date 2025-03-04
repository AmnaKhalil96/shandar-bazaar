
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Check } from 'lucide-react';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });
  
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [cartItems.length, navigate]);
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeStep === 1) {
      // Validate shipping info
      if (Object.values(shippingInfo).some(value => value === '')) {
        toast.error('Please fill in all shipping information fields');
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      // Validate payment info
      if (Object.values(paymentInfo).some(value => value === '')) {
        toast.error('Please fill in all payment information fields');
        return;
      }
      
      // Process order
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setActiveStep(3);
        clearCart();
      }, 2000);
    }
  };
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {activeStep < 3 && (
            <button 
              onClick={() => activeStep === 1 ? navigate('/cart') : setActiveStep(1)}
              className="flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {activeStep === 1 ? 'Back to Cart' : 'Back to Shipping'}
            </button>
          )}
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  {activeStep > 1 ? <Check className="w-5 h-5" /> : 1}
                </div>
                <div className="text-sm font-medium ml-2">Shipping</div>
              </div>
              <div className={`h-1 w-24 mx-2 ${activeStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  {activeStep > 2 ? <Check className="w-5 h-5" /> : 2}
                </div>
                <div className="text-sm font-medium ml-2">Payment</div>
              </div>
              <div className={`h-1 w-24 mx-2 ${activeStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <div className="text-sm font-medium ml-2">Confirmation</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              {activeStep === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <Truck className="w-5 h-5 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">State</label>
                        <input
                          type="text"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Zip Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Country</label>
                        <select
                          name="country"
                          value={shippingInfo.country}
                          onChange={handleShippingChange}
                          className="w-full p-2 border rounded-md"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">Continue to Payment</Button>
                  </form>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name on Card</label>
                        <input
                          type="text"
                          name="cardName"
                          value={paymentInfo.cardName}
                          onChange={handlePaymentChange}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Exp Month</label>
                          <select
                            name="expMonth"
                            value={paymentInfo.expMonth}
                            onChange={handlePaymentChange}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Exp Year</label>
                          <select
                            name="expYear"
                            value={paymentInfo.expYear}
                            onChange={handlePaymentChange}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={i} value={String(new Date().getFullYear() + i)}>
                                {new Date().getFullYear() + i}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            placeholder="123"
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Order'}
                    </Button>
                  </form>
                </div>
              )}
              
              {activeStep === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for your purchase! Your order has been placed and will be processed soon.
                    We've sent a confirmation email with your order details.
                  </p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="mx-auto"
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            {activeStep < 3 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="mb-4 max-h-64 overflow-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 mb-3">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium">{item.name}</h4>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} x {item.quantity}
                            </span>
                            <span className="text-sm font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-3">
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
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
