
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar: React.FC = () => {
  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-6">
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Search products, suppliers, categories..."
          className="pr-10 border-gray-300 focus:border-medical-primary focus:ring-medical-primary"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-medical-primary"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
