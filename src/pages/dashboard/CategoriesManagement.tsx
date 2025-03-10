
import { useState } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample categories data
const categories = [
  { id: 1, name: 'Electronics', productCount: 15, image: 'https://placehold.co/100x100?text=Electronics' },
  { id: 2, name: 'Fashion', productCount: 12, image: 'https://placehold.co/100x100?text=Fashion' },
  { id: 3, name: 'Home & Living', productCount: 8, image: 'https://placehold.co/100x100?text=Home' },
  { id: 4, name: 'Beauty', productCount: 6, image: 'https://placehold.co/100x100?text=Beauty' },
  { id: 5, name: 'Sports', productCount: 10, image: 'https://placehold.co/100x100?text=Sports' },
  { id: 6, name: 'Books', productCount: 7, image: 'https://placehold.co/100x100?text=Books' },
];

export default function CategoriesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCategory = () => {
    toast({
      title: "Add Category",
      description: "This would open a form to add a new category.",
    });
  };
  
  const handleEditCategory = (categoryId: number) => {
    toast({
      title: "Edit Category",
      description: `Editing category with ID: ${categoryId}`,
    });
  };
  
  const handleDeleteCategory = (categoryId: number) => {
    toast({
      title: "Delete Category",
      description: `Deleting category with ID: ${categoryId}`,
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
        <Button onClick={handleAddCategory} className="gap-1">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search categories..."
            className="w-full bg-background h-9 rounded-md border border-input px-4 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredCategories.map((category) => (
          <div key={category.id} className="rounded-lg border bg-card overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.productCount} products
              </p>
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCategory(category.id)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="rounded-lg border bg-card p-8 text-center">
          <h3 className="text-lg font-medium">No categories found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your search or add a new category.
          </p>
          <Button className="mt-4" onClick={handleAddCategory}>
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </div>
      )}
    </div>
  );
}
