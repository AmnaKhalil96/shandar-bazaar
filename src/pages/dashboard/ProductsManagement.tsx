
import { useState } from 'react';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/shadcn-button';
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ProductsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const { toast } = useToast();
  
  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This would open a form to add a new product.",
    });
  };
  
  const handleEditProduct = (productId: number) => {
    toast({
      title: "Edit Product",
      description: `Editing product with ID: ${productId}`,
    });
  };
  
  const handleDeleteProduct = (productId: number) => {
    toast({
      title: "Delete Product",
      description: `Deleting product with ID: ${productId}`,
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button onClick={handleAddProduct} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full bg-background h-9 rounded-md border border-input pl-8 pr-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
          <option value="beauty">Beauty</option>
          <option value="sports">Sports</option>
          <option value="books">Books</option>
        </select>
      </div>
      
      <div className="rounded-lg border bg-card">
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="font-medium p-4">ID</th>
                <th className="font-medium p-4">Image</th>
                <th className="font-medium p-4">Name</th>
                <th className="font-medium p-4">Category</th>
                <th className="font-medium p-4">Price</th>
                <th className="font-medium p-4">Stock</th>
                <th className="font-medium p-4">Rating</th>
                <th className="font-medium p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4 align-middle">{product.id}</td>
                  <td className="p-4 align-middle">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="p-4 align-middle">{product.name}</td>
                  <td className="p-4 align-middle">{product.category}</td>
                  <td className="p-4 align-middle">${product.price.toFixed(2)}</td>
                  <td className="p-4 align-middle">{product.stock}</td>
                  <td className="p-4 align-middle">{product.rating}/5</td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
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
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
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
