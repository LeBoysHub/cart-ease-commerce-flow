
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { productService } from '@/lib/mockData';
import { Product } from '@/types';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true,
    featured: false
  });
  
  useEffect(() => {
    if (isEditing && id) {
      const product = productService.getById(id);
      if (product) {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          image: product.image,
          category: product.category,
          inStock: product.inStock,
          featured: product.featured || false
        });
      } else {
        navigate('/admin/products');
      }
    }
  }, [id, isEditing, navigate]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setForm(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!form.name || !form.description || !form.price || !form.image || !form.category) {
        alert('Please fill in all required fields');
        return;
      }
      
      const productData = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image,
        category: form.category,
        inStock: form.inStock,
        featured: form.featured
      };
      
      if (isEditing && id) {
        productService.update({
          ...productData,
          id,
          createdAt: new Date(),
          updatedAt: new Date()
        } as Product);
      } else {
        productService.create(productData);
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing 
            ? 'Update the product information' 
            : 'Create a new product to add to your inventory'
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input 
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Electronics"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-md border p-6">
              <h3 className="font-medium mb-4">Product Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inStock">In Stock</Label>
                    <p className="text-sm text-muted-foreground">
                      Is this product available for purchase?
                    </p>
                  </div>
                  <Switch
                    id="inStock"
                    checked={form.inStock}
                    onCheckedChange={(checked) => 
                      handleSwitchChange('inStock', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Featured</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this product on the home page
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={form.featured}
                    onCheckedChange={(checked) => 
                      handleSwitchChange('featured', checked)
                    }
                  />
                </div>
              </div>
              
              {form.image && (
                <div className="mt-6">
                  <Label>Preview</Label>
                  <div className="mt-2 aspect-square max-w-sm rounded-md overflow-hidden bg-secondary">
                    <img
                      src={form.image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Image+Error';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
