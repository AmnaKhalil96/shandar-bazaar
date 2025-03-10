
import { Home, ShoppingBag, ListTree, Users, BarChart, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/shadcn-button';
import { cn } from '@/lib/utils';

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/dashboard/products' },
    { icon: ListTree, label: 'Categories', path: '/dashboard/categories' },
    { icon: Users, label: 'Customers', path: '/dashboard/customers' },
    { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className={cn(
      "h-screen border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <Link to="/dashboard" className="text-xl font-bold text-primary">
            ShopDaraz
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>
      
      <div className="p-2">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("mr-2 h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
