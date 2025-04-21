
import { ReactNode } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard, Package, ClipboardList, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: ReactNode;
}

// In a real app, this would check actual authentication and admin status
const checkIsAdmin = () => {
  return true; // Mocked for demo
};

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  // Mock admin check - would use real authentication in a real app
  const isAdmin = checkIsAdmin();
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background">
        <div className="container flex h-14 items-center">
          <Link to="/" className="flex items-center gap-2 mr-8">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <span className="font-bold">CartEase Admin</span>
          </Link>
          
          <Link to="/" className="ml-auto flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </div>
      </header>
      
      <div className="container grid grid-cols-1 md:grid-cols-[220px_1fr] md:gap-8 py-8">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <nav className="flex flex-col gap-2 sticky top-24">
            <h4 className="text-sm font-medium text-muted-foreground mb-1 px-2">
              Admin
            </h4>
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors ${
                isActive('/admin') ? 'bg-secondary font-medium' : ''
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors ${
                isActive('/admin/products') ? 'bg-secondary font-medium' : ''
              }`}
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors ${
                isActive('/admin/orders') ? 'bg-secondary font-medium' : ''
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              Orders
            </Link>
          </nav>
        </aside>
        
        {/* Mobile nav */}
        <div className="flex mb-6 gap-4 overflow-x-auto pb-2 md:hidden">
          <Link
            to="/admin"
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${
              isActive('/admin')
                ? 'bg-secondary font-medium'
                : 'bg-transparent hover:bg-secondary/50'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${
              isActive('/admin/products')
                ? 'bg-secondary font-medium'
                : 'bg-transparent hover:bg-secondary/50'
            }`}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm ${
              isActive('/admin/orders')
                ? 'bg-secondary font-medium'
                : 'bg-transparent hover:bg-secondary/50'
            }`}
          >
            Orders
          </Link>
        </div>
        
        {/* Main content */}
        <main className="space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
