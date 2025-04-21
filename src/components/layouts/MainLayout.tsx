
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' },
  ];

  const adminItems = [
    { text: 'Dashboard', path: '/admin' },
    { text: 'Products', path: '/admin/products' },
    { text: 'Orders', path: '/admin/orders' },
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CartEase</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>
          
          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            
            {/* Admin/User button */}
            <Link to="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] pr-0">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-2 py-1 text-sm font-medium rounded-md hover:bg-secondary ${
                        isActive(item.path) ? 'bg-secondary' : ''
                      }`}
                    >
                      {item.text}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-2" />
                  <h4 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Admin
                  </h4>
                  {adminItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-2 py-1 text-sm font-medium rounded-md hover:bg-secondary ${
                        isActive(item.path) ? 'bg-secondary' : ''
                      }`}
                    >
                      {item.text}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="font-bold">CartEase</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Easy shopping, anytime, anywhere.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h4 className="font-semibold">Links</h4>
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
              Products
            </Link>
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              Admin
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h4 className="font-semibold">Legal</h4>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="container mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CartEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
