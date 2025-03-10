
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/shadcn-button';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Category } from '@/lib/data';
import { fetchCategories, deleteCategory } from '@/services/api';

export default function CategoriesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          // Fallback to static data if API returns empty
          const { categories: staticCategories } = await import('@/lib/data');
          setCategories(staticCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to static data on error
        const { categories: staticCategories } = await import('@/lib/data');
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    };
    
    getCategories();
  }, []);
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCategory = () => {
    toast({
      title: "Add Category",
      description: "This would open a form to add a new category to MongoDB.",
    });
  };
  
  const handleEditCategory = (categoryId: number) => {
    toast({
      title: "Edit Category",
      description: `Editing category with ID: ${categoryId} in MongoDB`,
    });
  };
  
  const handleDeleteCategory = async (categoryId: number) => {
    try {
      const success = await deleteCategory(categoryId);
      
      if (success) {
        // Remove from local state
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        
        toast({
          title: "Category Deleted",
          description: `Category with ID: ${categoryId} has been deleted from MongoDB`,
        });
      } else {
        toast({
          title: "Delete Failed",
          description: "Failed to delete category from the database",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Delete Failed",
        description: "An error occurred while deleting the category",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-lg border bg-card h-48 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }
  
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
                src={`https://placehold.co/100x100?text=${category.name}`} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                {category.itemCount} products
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
