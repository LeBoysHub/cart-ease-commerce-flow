
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

export default function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  
  useEffect(() => {
    // Get the order info from location state
    const state = location.state as { orderId: string; paymentId: string } | null;
    
    if (!state?.orderId || !state?.paymentId) {
      // If no order info in state, redirect to home
      navigate('/');
      return;
    }
    
    setOrderId(state.orderId);
    setPaymentId(state.paymentId);
  }, [location, navigate]);
  
  if (!orderId) return null; // Don't render until we validate the order
  
  return (
    <MainLayout>
      <div className="container py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="rounded-full bg-green-100 p-4 mx-auto w-16 h-16 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="mt-6 text-2xl font-bold">Thank you for your order!</h1>
          
          <p className="mt-4 text-muted-foreground">
            Your order has been successfully placed and will be processed soon.
          </p>
          
          <div className="mt-6 rounded-lg border p-4 bg-secondary/50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Order Reference:</span>
                <span>{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment ID:</span>
                <span>{paymentId}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <Link to="/">
              <Button className="w-full">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
