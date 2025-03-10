
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Search, Filter, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock order history data
const orderHistory = [
  { 
    id: 'ORD-10001', 
    date: '2023-01-10', 
    status: 'Delivered', 
    total: 79.99,
    items: 2
  },
  { 
    id: 'ORD-10002', 
    date: '2023-02-28', 
    status: 'Delivered', 
    total: 149.50,
    items: 3
  },
  { 
    id: 'ORD-10003', 
    date: '2023-04-15', 
    status: 'Delivered', 
    total: 29.99,
    items: 1
  },
  { 
    id: 'ORD-10004', 
    date: '2023-06-22', 
    status: 'Delivered', 
    total: 199.95,
    items: 4
  },
  { 
    id: 'ORD-10005', 
    date: '2023-08-05', 
    status: 'Delivered', 
    total: 59.90,
    items: 2
  },
  { 
    id: 'ORD-10006', 
    date: '2023-09-18', 
    status: 'Delivered', 
    total: 129.99,
    items: 3
  },
];

export default function UserOrderHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  // Apply filters
  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (dateFilter === 'all') return matchesSearch;
    
    const orderDate = new Date(order.date);
    const now = new Date();
    
    if (dateFilter === '3months' && 
        orderDate >= new Date(now.setMonth(now.getMonth() - 3))) {
      return matchesSearch;
    }
    
    if (dateFilter === '6months' && 
        orderDate >= new Date(now.setMonth(now.getMonth() - 6))) {
      return matchesSearch;
    }
    
    if (dateFilter === '1year' && 
        orderDate >= new Date(now.setFullYear(now.getFullYear() - 1))) {
      return matchesSearch;
    }
    
    return false;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
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
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Order History Table */}
      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="font-medium p-4">Order ID</th>
                <th className="font-medium p-4">Date</th>
                <th className="font-medium p-4">Items</th>
                <th className="font-medium p-4">Total</th>
                <th className="font-medium p-4">Status</th>
                <th className="font-medium p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4">${order.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/user-dashboard/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center p-12 border rounded-lg bg-card">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No orders found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery 
              ? "Try a different search term" 
              : "You haven't placed any orders in this time period"}
          </p>
        </div>
      )}
    </div>
  );
}
