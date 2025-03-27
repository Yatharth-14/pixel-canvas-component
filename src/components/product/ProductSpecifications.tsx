
import React from "react";

interface Specification {
  name: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
  specifications,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {specifications.map((spec, index) => (
        <div 
          key={index} 
          className={`p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} rounded`}
        >
          <div className="text-sm font-medium text-gray-500">{spec.name}</div>
          <div className="text-sm font-medium text-gray-900">{spec.value}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductSpecifications;
