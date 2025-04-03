
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VendorGalleryProps {
  images: string[];
  vendorName: string;
}

const VendorGallery: React.FC<VendorGalleryProps> = ({ images, vendorName }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Photo Gallery</h2>
        <p className="text-gray-500 mb-6">Images of products, facilities and services provided by {vendorName}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-lg overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <img 
                src={image} 
                alt={`${vendorName} gallery image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorGallery;
