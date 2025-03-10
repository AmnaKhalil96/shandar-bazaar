
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Eye, MoreHorizontal, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample customers data
const customers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', orders: 5, totalSpent: 438.25, lastOrder: '2023-08-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', orders: 3, totalSpent: 127.50, lastOrder: '2023-08-11' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', orders: 12, totalSpent: 892.75, lastOrder: '2023-08-18' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', orders: 8, totalSpent: 653.30, lastOrder: '2023-08-16' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', orders: 2, totalSpent: 89.95, lastOrder: '2023-08-05' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', orders: 7, totalSpent: 542.15, lastOrder: '2023-08-14' },
  { id: 7, name: 'George Banks', email: 'george@example.com', orders: 4, totalSpent: 215.40, lastOrder: '2023-08-10' },
  { id: 8, name: 'Hannah Baker', email: 'hannah@example.com', orders: 6, totalSpent: 378.60, lastOrder: '2023-08-17' },
  { id: 9, name: 'Ian Malcolm', email: 'ian@example.com', orders: 1, totalSpent: 49.99, lastOrder: '2023-08-01' },
  { id: 10, name: 'Julia Roberts', email: 'julia@example.com', orders: 9, totalSpent: 745.80, lastOrder: '2023-08-13' },
  { id: 11, name: 'Kevin Hart', email: 'kevin@example.com', orders: 3, totalSpent: 150.25, lastOrder: '2023-08-09' },
  { id: 12, name: 'Laura Palmer', email: 'laura@example.com', orders: 5, totalSpent: 267.50, lastOrder: '2023-08-12' },
  { id: 13, name: 'Mike Wheeler', email: 'mike@example.com', orders: 4, totalSpent: 189.95, lastOrder: '2023-08-07' },
  { id: 14, name: 'Nina Dobrev', email: 'nina@example.com', orders: 2, totalSpent: 95.80, lastOrder: '2023-08-04' },
  { id: 15, name: 'Omar Little', email: 'omar@example.com', orders: 7, totalSpent: 423.40, lastOrder: '2023-08-15' },
];

export default function CustomersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;
  const { toast } = useToast();
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Paginate customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleViewCustomer = (customerId: number) => {
    toast({
      title: "View Customer",
      description: `Viewing customer with ID: ${customerId}`,
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search customers by name or email..."
            className="w-full bg-background h-9 rounded-md border border-input pl-8 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="font-medium p-4">ID</th>
                <th className="font-medium p-4">Name</th>
                <th className="font-medium p-4">Email</th>
                <th className="font-medium p-4">Orders</th>
                <th className="font-medium p-4">Total Spent</th>
                <th className="font-medium p-4">Last Order</th>
                <th className="font-medium p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4 align-middle">{customer.id}</td>
                  <td className="p-4 align-middle font-medium">{customer.name}</td>
                  <td className="p-4 align-middle">{customer.email}</td>
                  <td className="p-4 align-middle">{customer.orders}</td>
                  <td className="p-4 align-middle">${customer.totalSpent.toFixed(2)}</td>
                  <td className="p-4 align-middle">{formatDate(customer.lastOrder)}</td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCustomer(customer.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-2">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstCustomer + 1}-{Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
