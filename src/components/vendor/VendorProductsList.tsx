import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock products data
const mockProducts = [
  {
    id: "123",
    name: "Professional Digital Medical Thermometer",
    price: 1899.0,
    discountPrice: 1499.0,
    rating: 4.5,
    reviewCount: 42,
    description:
      "Digital medical thermometer with high precision sensors for accurate temperature readings.",
    image: "/lovable-uploads/5b25fda1-45e3-4ff4-b1a4-b067322379de.png",
    status: "In Stock",
  },
  {
    id: "124",
    name: "Advanced Blood Pressure Monitor",
    price: 3499.0,
    discountPrice: 2999.0,
    rating: 4.7,
    reviewCount: 28,
    description:
      "Automatic digital blood pressure monitor with high accuracy and memory function.",
    image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a",
    status: "In Stock",
  },
  {
    id: "125",
    name: "Digital Pulse Oximeter",
    price: 1299.0,
    discountPrice: 999.0,
    rating: 4.3,
    reviewCount: 15,
    description:
      "Measures oxygen saturation levels (SpO2) and pulse rate quickly and accurately.",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde",
    status: "In Stock",
  },
  {
    id: "126",
    name: "Infrared Forehead Thermometer",
    price: 2499.0,
    discountPrice: 1999.0,
    rating: 4.1,
    reviewCount: 37,
    description:
      "Non-contact infrared thermometer for quick and hygienic temperature measurement.",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
    status: "Low Stock",
  },
];

interface VendorProductsListProps {
  vendorId: string;
}

const VendorProductsList: React.FC<VendorProductsListProps> = ({
  vendorId,
}) => {
  // In a real application, fetch products based on vendorId
  const products = mockProducts;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Products ({products.length})
            </h2>
            <div className="flex space-x-2">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <option value="">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline mt-2 mb-1">
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.discountPrice.toLocaleString()}
                      </span>
                      {product.discountPrice < product.price && (
                        <>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="ml-2 text-green-600 text-xs font-medium">
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100
                            )}
                            % off
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-gray-500">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="ml-auto bg-green-50 text-green-700 text-xs border-green-100"
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorProductsList;
