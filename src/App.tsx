
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import CategoriesPage from "./pages/CategoriesPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DealsPage from "./pages/DealsPage";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./contexts/CartContext";

// Dashboard imports
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import CategoriesManagement from "./pages/dashboard/CategoriesManagement";
import CustomersManagement from "./pages/dashboard/CustomersManagement";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";

// User Dashboard imports
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import UserDashboardOverview from "./pages/user-dashboard/UserDashboardOverview";
import UserOrders from "./pages/user-dashboard/UserOrders";
import UserWishlist from "./pages/user-dashboard/UserWishlist";
import UserPaymentMethods from "./pages/user-dashboard/UserPaymentMethods";
import UserOrderHistory from "./pages/user-dashboard/UserOrderHistory";
import UserProfile from "./pages/user-dashboard/UserProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Store Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/account/*" element={<AccountPage />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="categories" element={<CategoriesManagement />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          {/* User Dashboard Routes */}
          <Route path="/user-dashboard" element={<UserDashboardLayout />}>
            <Route index element={<UserDashboardOverview />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="wishlist" element={<UserWishlist />} />
            <Route path="payment-methods" element={<UserPaymentMethods />} />
            <Route path="order-history" element={<UserOrderHistory />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
