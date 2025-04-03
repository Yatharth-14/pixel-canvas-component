
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductsByCategory, Product } from '@/Backend/services/products';
import { addToCart } from '@/Backend/services/cart';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/Backend/contexts/AuthContext';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (categoryId) {
        const data = await getProductsByCategory(categoryId);
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You need to login to add items to cart",
        variant: "destructive"
      });
      return;
    }

    const success = await addToCart(product.id);
    if (success) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Get category name from the categoryId slug
  const getCategoryName = () => {
    if (!categoryId) return '';
    
    const categoryMap: Record<string, string> = {
      'medical-supplies': 'Medical Supplies',
      'building-construction': 'Building & Construction',
      'industrial-machinery': 'Industrial Machinery',
      'electronics-electrical': 'Electronics & Electrical',
      'chemical-products': 'Chemical Products',
      'agriculture-products': 'Agriculture Products'
    };
    
    return categoryMap[categoryId] || categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Link>
        </Button>
        <h1 className="text-2xl font-bold text-medical-primary">{getCategoryName()}</h1>
        <p className="text-gray-600">Browse our selection of {getCategoryName().toLowerCase()} products</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-primary"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found in this category.</p>
          <Link to="/">
            <Button>Browse Other Categories</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const primaryImage = product.images?.find(img => img.is_primary)?.image_url || 
                                product.images?.[0]?.image_url || '/placeholder.svg';
                                
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={primaryImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link to={`/product/${product.id}`} className="hover:text-medical-primary">
                      {product.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-medical-primary font-semibold">
                    {product.discounted_price ? (
                      <>
                        <span>₹{product.discounted_price.toLocaleString()}</span>
                        <span className="text-gray-500 line-through ml-2 text-sm">₹{product.price.toLocaleString()}</span>
                      </>
                    ) : (
                      <>₹{product.price.toLocaleString()}</>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    size="sm" 
                    className="bg-medical-primary hover:bg-medical-primary/90 w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
