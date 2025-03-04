
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, CreditCard, Truck, ShieldCheck, Package } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-16 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Free Shipping</h4>
              <p className="text-sm text-muted-foreground">On all orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">100% secure payments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Easy Returns</h4>
              <p className="text-sm text-muted-foreground">30 days return policy</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold">Flexible Payment</h4>
              <p className="text-sm text-muted-foreground">Multiple payment methods</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Shop Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">ShopDaraz</h3>
            <p className="text-muted-foreground mb-6">
              Discover the latest fashion trends and premium quality products at unbeatable prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Useful Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ & Help</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Shipping & Return</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms & Conditions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Electronics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Fashion</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Home & Living</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Beauty</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Sports & Outdoors</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">123 Commerce St, New City, 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">contact@shopdaarz.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2023 ShopDaraz. All rights reserved.
          </p>
          <div>
            <img 
              src="https://i.imgur.com/AHCoUZO.png" 
              alt="Payment Methods"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
