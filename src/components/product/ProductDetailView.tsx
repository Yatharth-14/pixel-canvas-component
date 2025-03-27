
import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImageGallery from "./ProductImageGallery";
import ProductSpecifications from "./ProductSpecifications";
import { Card, CardContent } from "@/components/ui/card";

// Mock product data - in a real app this would come from an API
const getMockProduct = (id: string | undefined) => {
  return {
    id: id || "1",
    name: "Professional Digital Medical Thermometer",
    price: 2499.00,
    discountPrice: 1899.00,
    rating: 4.5,
    reviewCount: 256,
    description: "Digital medical thermometer with high precision sensors for accurate temperature readings. Features quick measurement, fever alarm, memory function, and waterproof design. Suitable for oral, rectal, and axillary use.",
    bulletPoints: [
      "High accuracy temperature sensor (±0.1°C)",
      "Fast 10-second reading time",
      "Large easy-to-read LCD display with backlight",
      "Memory recalls last 20 readings",
      "Fever alarm with color-coded display",
      "Waterproof design for easy cleaning",
      "Auto shut-off to conserve battery life"
    ],
    specifications: [
      { name: "Measurement Range", value: "32.0°C to 42.9°C (89.6°F to 109.2°F)" },
      { name: "Accuracy", value: "±0.1°C (±0.2°F)" },
      { name: "Display", value: "LCD Digital Display with Backlight" },
      { name: "Memory", value: "20 readings" },
      { name: "Battery", value: "CR2032 lithium cell" },
      { name: "Battery Life", value: "Approximately 1,000 measurements" },
      { name: "Measurement Time", value: "10 seconds" },
      { name: "Waterproof Grade", value: "IPX7" }
    ],
    images: [
      "/lovable-uploads/5b25fda1-45e3-4ff4-b1a4-b067322379de.png",
      "https://images.unsplash.com/photo-1584556812952-905ffd0c611a",
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde"
    ],
    inStock: true,
    brandName: "MediTech Instruments",
    sku: "MT-DT2023-PRO",
    deliveryEstimate: "2-4 business days"
  };
};

interface ProductDetailViewProps {
  productId: string | undefined;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const product = getMockProduct(productId);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="md:sticky md:top-20 self-start">
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {renderRatingStars(product.rating)}
              </div>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {product.rating} ({product.reviewCount} ratings)
              </span>
            </div>
            <div className="flex items-center mb-1">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mr-3">
                {product.brandName}
              </Badge>
              <span className="text-gray-500 text-sm">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="border-t border-b py-4 my-4">
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold text-gray-900">₹{product.discountPrice.toLocaleString()}</span>
              {product.discountPrice < product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="ml-2 text-green-600 font-medium">
                    Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                </>
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
                <span className={`block text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'} mb-1`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-600">Delivery in {product.deliveryEstimate}</span>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1 border-gray-300 hover:bg-gray-100">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-xl font-semibold mb-2">About this item</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <ul className="list-disc pl-5 space-y-1">
              {product.bulletPoints.map((point, index) => (
                <li key={index} className="text-gray-700">{point}</li>
              ))}
            </ul>
          </div>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
              <ProductSpecifications specifications={product.specifications} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
