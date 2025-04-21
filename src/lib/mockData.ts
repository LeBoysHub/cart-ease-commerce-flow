
import { Product, Order, OrderStatus } from '@/types';

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and exceptional sound quality. Perfect for music lovers and audiophiles.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    category: 'Electronics',
    inStock: true,
    featured: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, step counting, and sleep tracking.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    category: 'Wearables',
    inStock: true,
    featured: true,
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10')
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height. Perfect for long hours of work or gaming.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    category: 'Furniture',
    inStock: true,
    createdAt: new Date('2023-03-05'),
    updatedAt: new Date('2023-03-05')
  },
  {
    id: '4',
    name: 'Professional Camera Kit',
    description: 'Complete camera kit for amateur and professional photographers. Includes high resolution DSLR camera and various lenses.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    category: 'Electronics',
    inStock: false,
    createdAt: new Date('2023-04-20'),
    updatedAt: new Date('2023-04-20')
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with amazing sound quality and 24-hour battery life. Perfect for outdoor activities.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    category: 'Electronics',
    inStock: true,
    featured: true,
    createdAt: new Date('2023-05-12'),
    updatedAt: new Date('2023-05-12')
  },
  {
    id: '6',
    name: 'Premium Coffee Machine',
    description: 'Automatic coffee machine with built-in grinder and milk frother. Make barista-quality coffee at home.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    category: 'Appliances',
    inStock: true,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01')
  }
];

// Mock orders data
export const orders: Order[] = [
  {
    id: '1',
    items: [
      {
        id: '1-1',
        productId: '1',
        productName: 'Premium Wireless Headphones',
        productPrice: 199.99,
        quantity: 1
      }
    ],
    total: 199.99,
    status: OrderStatus.DELIVERED,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerAddress: '123 Main St, Anytown, AN 12345',
    paymentId: 'pay_123456',
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    items: [
      {
        id: '2-1',
        productId: '2',
        productName: 'Smart Fitness Watch',
        productPrice: 149.99,
        quantity: 1
      },
      {
        id: '2-2',
        productId: '5',
        productName: 'Portable Bluetooth Speaker',
        productPrice: 79.99,
        quantity: 2
      }
    ],
    total: 309.97,
    status: OrderStatus.SHIPPED,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerAddress: '456 Broad St, Othertown, OT 67890',
    paymentId: 'pay_789012',
    createdAt: new Date('2023-07-20')
  }
];

// Service functions for data manipulation
export const productService = {
  getAll: () => products,
  getById: (id: string) => products.find(p => p.id === id),
  getFeatured: () => products.filter(p => p.featured),
  getByCategory: (category: string) => products.filter(p => p.category === category),
  search: (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      p => p.name.toLowerCase().includes(lowercaseQuery) || 
           p.description.toLowerCase().includes(lowercaseQuery)
    );
  },
  // In a real app, these would connect to an API
  create: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(newProduct as Product);
    return newProduct;
  },
  update: (product: Product) => {
    const index = products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      products[index] = { ...product, updatedAt: new Date() };
      return products[index];
    }
    return null;
  },
  delete: (id: string) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      return true;
    }
    return false;
  }
};

export const orderService = {
  getAll: () => orders,
  getById: (id: string) => orders.find(o => o.id === id),
  create: (order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder = {
      ...order,
      id: (orders.length + 1).toString(),
      createdAt: new Date()
    };
    orders.push(newOrder as Order);
    return newOrder;
  },
  updateStatus: (id: string, status: OrderStatus) => {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index] = { ...orders[index], status };
      return orders[index];
    }
    return null;
  }
};
