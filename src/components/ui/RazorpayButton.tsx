
import { useEffect } from 'react';
import { Button } from './button';

interface RazorpayButtonProps {
  amount: number; // in rupees
  customerName: string;
  customerEmail: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: any) => void;
  buttonText?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayButton({
  amount,
  customerName,
  customerEmail,
  onSuccess,
  onFailure,
  buttonText = 'Pay Now'
}: RazorpayButtonProps) {
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      onFailure('Razorpay SDK failed to load');
      return;
    }

    // In a real app, you would get this from your backend
    // For demo purposes, we're creating it on the client side
    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // Enter your test key here
      amount: amount * 100, // Razorpay takes amount in paise
      currency: 'INR',
      name: 'CartEase',
      description: 'Purchase from CartEase',
      image: 'https://your-logo-url.com',
      handler: function (response: { razorpay_payment_id: string }) {
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: customerName,
        email: customerEmail,
      },
      theme: {
        color: '#9b87f5',
      },
      modal: {
        ondismiss: function() {
          onFailure('Payment cancelled');
        },
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      onFailure(error);
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="w-full"
    >
      {buttonText}
    </Button>
  );
}
