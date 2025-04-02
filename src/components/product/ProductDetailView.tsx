
import React, { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImageGallery from "./ProductImageGallery";
import ProductSpecifications from "./ProductSpecifications";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getProductDetail, Product } from "@/Backend/services/products";
import { addToCart } from "@/Backend/services/cart";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/Backend/contexts/AuthContext";

interface ProductDetailViewProps {
  productId: string | undefined;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (productId) {
        const data = await getProductDetail(productId);
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You need to login to add items to cart",
        variant: "destructive"
      });
      return;
    }

    if (!product) return;

    const success = await addToCart(product.id, quantity);
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

  // Render the rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <Star className="text-gray-300" />
          <Star className="absolute top-0 left-0 fill-yellow-400 text-yellow-400 overflow-hidden w-[50%]" />
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medical-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  // Extract the bullet points from description (if any)
  const description = product.description || '';
  const bulletPoints = description.includes('\n') 
    ? description.split('\n').filter(line => line.trim().length > 0)
    : [];
  const mainDescription = bulletPoints.length > 0 
    ? description.substring(0, description.indexOf('\n')).trim() 
    : description;

  // Organize images for gallery
  const images = product.images?.map(img => img.image_url) || [];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="md:sticky md:top-20 self-start">
          <ProductImageGallery images={images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            {product.rating && (
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {product.rating} ({product.review_count} ratings)
                </span>
              </div>
            )}
            <div className="flex items-center mb-1">
              {product.brand && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mr-3 hover:bg-blue-100 cursor-pointer">
                  {product.brand}
                </Badge>
              )}
              {product.sku && (
                <span className="text-gray-500 text-sm">SKU: {product.sku}</span>
              )}
            </div>
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="flex items-baseline mb-2">
              {product.discounted_price ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">₹{product.discounted_price.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-green-600 font-medium">
                    Save {Math.round(((product.price - (product.discounted_price || 0)) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-4">MRP inclusive of all taxes</p>
            
            <div className="flex items-center mt-6 mb-4">
              <div className="mr-4">
                <label htmlFor="quantity" className="block text-sm text-gray-600 mb-1">Quantity</label>
                <select 
                  id="quantity" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  className="border border-gray-300 rounded p-2 w-16"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <span className={`block text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'} mb-1`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-600">Delivery in 2-4 business days</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Button 
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                Buy Now
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-gray-300 hover:bg-gray-100"
                onClick={handleAddToCart}
                disabled={!product.in_stock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">About this item</h2>
            <p className="text-gray-700 mb-4">{mainDescription}</p>
            {bulletPoints.length > 0 && (
              <ul className="list-disc pl-5 space-y-1">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="text-gray-700">{point}</li>
                ))}
              </ul>
            )}
          </div>

          {product.specifications && product.specifications.length > 0 && (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
                <ProductSpecifications specifications={product.specifications} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
