
import { useState } from 'react';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Bell, Search, User } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/shadcn-button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export default function DashboardLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"`,
      });
    }
  };
  
  return (
    <div className="flex h-screen w-full bg-background">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-14 border-b bg-card flex items-center px-4 gap-4">
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-background h-9 rounded-md border border-input px-8 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View Store
            </Link>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline-block">Admin</span>
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
