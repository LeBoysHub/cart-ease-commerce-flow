
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { productService } from '@/lib/mockData';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = productService.getById(id || '');
  
  if (!product) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 pl-0 hover:pl-1 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              
              <div className="mt-4">
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Category</h3>
                <p className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none">
                  {product.category}
                </p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Availability</h3>
                {product.inStock ? (
                  <p className="text-green-600 font-medium">In Stock</p>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center mb-6">
                <h3 className="text-lg font-medium mr-4">Quantity</h3>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-12 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
