
import { Product } from '@/types';
import { Card, CardContent, CardFooter } from './card';
import { Button } from './button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square w-full overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground line-clamp-2 mt-1 text-sm">{product.description}</p>
          <p className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
          }}
          disabled={!product.inStock} 
          variant="default" 
          className="w-full"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
