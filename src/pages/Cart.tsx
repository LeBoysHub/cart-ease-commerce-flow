
import { MainLayout } from '@/components/layouts/MainLayout';
import { CartItem } from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <div className="mx-auto max-w-md">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-4 text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button className="mt-6">Browse Products</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="rounded-lg border">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Cart Items ({totalItems})</h2>
                
                <div>
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div>
            <div className="rounded-lg border h-fit sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      (Including all taxes)
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Link to="/checkout">
                    <Button className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={clearCart} className="w-full">
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
