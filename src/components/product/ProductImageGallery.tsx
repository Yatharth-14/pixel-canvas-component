
import React, { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  images, 
  productName 
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-white">
        <AspectRatio ratio={1}>
          <img
            src={images[selectedImageIndex]}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            className="h-full w-full object-contain"
          />
        </AspectRatio>
      </div>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: images.length > 5,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 basis-1/5">
                <div
                  className={cn(
                    "cursor-pointer overflow-hidden rounded border-2 transition-colors",
                    selectedImageIndex === index
                      ? "border-blue-600"
                      : "border-transparent hover:border-gray-300"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <AspectRatio ratio={1}>
                    <img
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 5 && (
            <>
              <CarouselPrevious className="absolute left-0 -translate-x-1/2" />
              <CarouselNext className="absolute right-0 translate-x-1/2" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductImageGallery;
