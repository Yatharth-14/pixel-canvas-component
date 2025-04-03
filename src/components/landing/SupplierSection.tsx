import React from 'react';
import { MapPin, ThumbsUp, Verified } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SupplierProps {
  name: string;
  location: string;
  image: string;
  products: string[];
  verified: boolean;
  yearEstablished: number;
}

const SupplierCard: React.FC<SupplierProps> = ({ 
  name, 
  location, 
  image, 
  products, 
  verified, 
  yearEstablished 
}) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <img 
            src={image} 
            alt={name} 
            className="w-16 h-16 object-contain border border-gray-200 rounded-md mr-3" 
          />
          <div>
            <h3 className="font-semibold text-medical-primary flex items-center">
              {name}
              {verified && (
                <Verified className="h-4 w-4 text-medical-accent ml-1" />
              )}
            </h3>
            <div className="flex items-center text-gray-600 text-xs mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              <span className="flex items-center">
                <ThumbsUp className="h-3 w-3 mr-1" />
                Since {yearEstablished}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex-1">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Main Products:</h4>
          <div className="flex flex-wrap gap-1">
            {products.map((product, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {product}
              </span>
            ))}
          </div>
        </div>
        
        <Button variant="outline" className="w-full border-medical-accent text-medical-accent hover:bg-medical-accent/10 mt-auto">
          Contact Supplier
        </Button>
      </CardContent>
    </Card>
  );
};

const SupplierSection: React.FC = () => {
  const suppliers = [
    {
      name: "Medicorp Ltd",
      location: "New Delhi, India",
      image: "https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      products: ["Surgical Gloves", "Face Masks", "Medical Equipment"],
      verified: true,
      yearEstablished: 2005
    },
    {
      name: "Pharma Solutions",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      products: ["Pharmaceuticals", "Medical Devices", "Healthcare"],
      verified: true,
      yearEstablished: 2008
    },
    {
      name: "TechMed Industries",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1516357231954-91487b459602?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      products: ["X-Ray Equipment", "Diagnostic Tools", "Lab Equipment"],
      verified: false,
      yearEstablished: 2012
    },
    {
      name: "BioLife Healthcare",
      location: "Chennai, India",
      image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      products: ["Ventilators", "ICU Equipment", "Patient Monitoring"],
      verified: true,
      yearEstablished: 2010
    }
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-medical-primary">Premium Suppliers</h2>
          <a href="#" className="text-medical-accent hover:underline text-sm">View All Suppliers</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {suppliers.map((supplier, index) => (
            <SupplierCard
              key={index}
              name={supplier.name}
              location={supplier.location}
              image={supplier.image}
              products={supplier.products}
              verified={supplier.verified}
              yearEstablished={supplier.yearEstablished}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplierSection;
