
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import { Minus, Plus, X } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="h-24 w-24 overflow-hidden rounded-md border bg-secondary">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{item.product.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              ${item.product.price.toFixed(2)} each
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => removeFromCart(item.product.id)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center rounded-md border">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 rounded-r-none"
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">
              {item.quantity}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="h-8 w-8 rounded-l-none"
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          <div className="ml-auto font-medium">
            ${(item.product.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
