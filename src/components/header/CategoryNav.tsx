
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNav: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scrollbar py-2 space-x-6 text-sm text-gray-700">
          <Link to="/category/medical-supplies" className="whitespace-nowrap hover:text-medical-primary">
            Medical Supplies
          </Link>
          <Link to="/category/building-construction" className="whitespace-nowrap hover:text-medical-primary">
            Building & Construction
          </Link>
          <Link to="/category/industrial-machinery" className="whitespace-nowrap hover:text-medical-primary">
            Industrial Machinery
          </Link>
          <Link to="/category/electronics-electrical" className="whitespace-nowrap hover:text-medical-primary">
            Electronics
          </Link>
          <Link to="/category/chemical-products" className="whitespace-nowrap hover:text-medical-primary">
            Chemical Products
          </Link>
          <Link to="/category/agriculture-products" className="whitespace-nowrap hover:text-medical-primary">
            Agriculture
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
