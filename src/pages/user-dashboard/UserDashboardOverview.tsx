
import { Package, CreditCard, Heart, Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/lib/data';

export default function UserDashboardOverview() {
  // Get latest 3 products for recent views
  const recentlyViewed = products.slice(0, 3);
  
  // Mock order data
  const recentOrders = [
    { id: 'ORD-12345', date: '2023-10-15', status: 'Delivered', total: 129.99 },
    { id: 'ORD-12346', date: '2023-10-28', status: 'Processing', total: 89.50 },
  ];

  // Statistics tiles for quick overview
  const stats = [
    { label: 'Orders', value: '4', icon: Package, path: '/user-dashboard/orders' },
    { label: 'Wishlist', value: '12', icon: Heart, path: '/user-dashboard/wishlist' },
    { label: 'Payment Methods', value: '2', icon: CreditCard, path: '/user-dashboard/payment-methods' },
    { label: 'Order History', value: '26', icon: Clock, path: '/user-dashboard/order-history' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, User!</h2>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.path}
            className="flex flex-col items-center p-6 border rounded-lg bg-card transition-colors hover:bg-accent/50"
          >
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="border rounded-lg bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recent Orders</h3>
            <Link 
              to="/user-dashboard/orders" 
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="font-medium p-4">Order ID</th>
                <th className="font-medium p-4">Date</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4">
                    <Link to={`/user-dashboard/orders/${order.id}`} className="hover:underline text-primary">
                      {order.id}
                    </Link>
                  </td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'}`
                    }>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="border rounded-lg bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recently Viewed</h3>
            <Link to="/products" className="text-sm text-primary hover:underline">
              Browse more
            </Link>
          </div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recentlyViewed.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium truncate">{product.name}</h4>
                <p className="text-primary mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="p-6 bg-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Special Offer</h3>
            <p className="text-muted-foreground mt-1">Use code <span className="font-bold">WELCOME20</span> for 20% off your next order!</p>
          </div>
          <Link to="/products">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
