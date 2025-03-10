
import React, { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Search, Filter, Clock, Check, Truck, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock orders data
const orders = [
  { 
    id: 'ORD-12345', 
    date: '2023-10-15', 
    status: 'Delivered', 
    total: 129.99,
    items: 3,
    trackingNumber: 'TRK123456789'
  },
  { 
    id: 'ORD-12346', 
    date: '2023-10-28', 
    status: 'Processing', 
    total: 89.50,
    items: 2,
    trackingNumber: 'TRK987654321'
  },
  { 
    id: 'ORD-12347', 
    date: '2023-11-05', 
    status: 'Shipped', 
    total: 59.99,
    items: 1,
    trackingNumber: 'TRK456789123'
  },
  { 
    id: 'ORD-12348', 
    date: '2023-11-12', 
    status: 'Pending', 
    total: 149.95,
    items: 4,
    trackingNumber: null
  }
];

export default function UserOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusBadge = (status: string) => {
    const styles = {
      'Delivered': { 
        bg: 'bg-green-100', 
        text: 'text-green-800',
        icon: Check
      },
      'Processing': { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800',
        icon: Clock
      },
      'Shipped': { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800',
        icon: Truck
      },
      'Pending': { 
        bg: 'bg-orange-100', 
        text: 'text-orange-800',
        icon: Package
      }
    };

    const style = styles[status as keyof typeof styles] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: Package };
    return { ...style };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by order ID..."
            className="w-full bg-background h-10 rounded-md border border-input pl-8 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const { bg, text, icon: StatusIcon } = getStatusBadge(order.status);

          return (
            <div key={order.id} className="border rounded-lg bg-card overflow-hidden">
              <div className="p-6 sm:flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{order.id}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${bg} ${text}`}>
                      <StatusIcon className="h-3 w-3" />
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm mt-1">
                      Tracking: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-4 sm:mt-0">
                  {order.status === 'Delivered' && (
                    <Button variant="outline" size="sm">
                      Write Review
                    </Button>
                  )}
                  <Link to={`/user-dashboard/orders/${order.id}`}>
                    <Button variant="default" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="text-center p-12 border rounded-lg bg-card">
            <Package className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No orders found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery 
                ? "Try a different search term" 
                : "You haven't placed any orders yet"}
            </p>
            <Link to="/products">
              <Button className="mt-4">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
