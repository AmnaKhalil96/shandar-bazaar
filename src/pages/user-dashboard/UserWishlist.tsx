
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Search, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

export default function UserWishlist() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Take first 5 products as mock wishlist items
  const wishlistItems = products.slice(0, 5);
  
  // Filter items based on search
  const filteredItems = wishlistItems.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveFromWishlist = (productId: number) => {
    toast({
      title: "Removed from wishlist",
      description: "The product has been removed from your wishlist.",
    });
  };

  const handleAddToCart = (productId: number) => {
    toast({
      title: "Added to cart",
      description: "The product has been added to your shopping cart.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Wishlist</h2>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search wishlist..."
          className="w-full bg-background h-10 rounded-md border border-input pl-8 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded-lg bg-card overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-40 h-40 shrink-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <Link to={`/product/${item.id}`} className="hover:underline">
                  <h3 className="font-medium">{item.name}</h3>
                </Link>
                <p className="text-muted-foreground">{item.description}</p>
                <p className="text-primary font-semibold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => handleAddToCart(item.id)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1 text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center p-12 border rounded-lg bg-card">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No wishlist items found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery 
                ? "Try a different search term" 
                : "Your wishlist is empty"}
            </p>
            <Link to="/products">
              <Button className="mt-4">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
