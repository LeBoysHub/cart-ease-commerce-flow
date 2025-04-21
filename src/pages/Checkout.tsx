import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RazorpayButton } from '@/components/ui/RazorpayButton';
import { orderService } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import { OrderStatus } from '@/types';
import { toast } from '@/components/ui/use-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentSuccess = (paymentId: string) => {
    // Create order with order service
    orderService.create({
      items: items.map(item => ({
        id: `${item.product.id}-${Date.now()}`,
        productId: item.product.id,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      status: OrderStatus.PAID,
      customerName: formData.name,
      customerEmail: formData.email,
      customerAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
      paymentId,
    });
    
    // Clear cart after successful order
    clearCart();
    
    // Navigate to success page
    navigate('/checkout/success', { 
      state: { 
        orderId: Date.now().toString(),
        paymentId, 
      } 
    });
  };
  
  const handlePaymentFailure = (error: any) => {
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: error.message || "Something went wrong with the payment. Please try again."
    });
  };
  
  const isFormValid = () => {
    return (
      formData.name && 
      formData.email && 
      formData.address && 
      formData.city && 
      formData.postalCode && 
      formData.country
    );
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Checkout Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, Apt 4B" 
                    required 
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input 
                      id="postalCode" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="United States" 
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>
              
              <RadioGroup defaultValue="razorpay">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-6 w-8">
                      <path
                        d="M8.315 13.859l-3.182-1.701a1.875 1.875 0 0 1-.98-1.65V3.617c0-.712.38-1.37.998-1.726l3.16-1.835a1.875 1.875 0 0 1 1.878 0l3.16 1.835c.618.356.999 1.014.999 1.726v6.891a1.875 1.875 0 0 1-.98 1.65l-3.182 1.7a1.875 1.875 0 0 1-1.871 0z"
                        fill="#3395FF"
                        stroke="none"
                      />
                      <path
                        d="M15.706 22.215v-6.867a1.875 1.875 0 0 1 .98-1.65l3.182-1.7a1.875 1.875 0 0 1 1.872 0l3.182 1.7c.619.331.98.944.98 1.65v6.891c0 .712-.38 1.37-.998 1.726l-3.161 1.835a1.875 1.875 0 0 1-1.878 0l-3.16-1.835a1.875 1.875 0 0 1-.999-1.726v-.024z"
                        fill="#072654"
                      />
                    </svg>
                    Razorpay
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="rounded-lg border h-fit sticky top-24">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between">
                      <div className="flex flex-col">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span className="text-xs text-muted-foreground">
                          ₹{item.product.price.toFixed(2)} each
                        </span>
                      </div>
                      <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        (Including all taxes)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <RazorpayButton
                    amount={totalPrice}
                    customerName={formData.name}
                    customerEmail={formData.email}
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                    buttonText="Complete Payment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
