
import React from 'react';
import { Bell, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const LandingHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">COVID Supplies</span>
            <span className="text-sm text-gray-600">Sell</span>
            <span className="text-sm text-gray-600">Help</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Download App</span>
            <Button variant="ghost" size="sm" className="p-1">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-1">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-medical-primary border-medical-primary hover:bg-medical-primary/10"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-medical-primary hover:bg-medical-primary/90"
                asChild
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-medical-primary">IndiaMart</div>
        </div>
        
        <div className="flex-1 max-w-3xl">
          <div className="relative flex items-center">
            <div className="flex-1">
              <Input 
                type="text" 
                placeholder="Enter product / service to search" 
                className="pl-10 pr-20 py-2 rounded-md border-2 border-medical-accent focus:border-medical-accent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button className="absolute right-0 rounded-l-none h-full bg-medical-accent hover:bg-medical-accent/90">
              Search
            </Button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-medical-accent text-medical-accent hover:bg-medical-accent/10">
            Get Best Price
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-medical-primary">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {['Building & Construction', 'Electronics & Electrical', 'Industrial Supplies', 'Pharmaceutical', 'Agriculture', 'Food & Beverages'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="px-4 py-3 text-white whitespace-nowrap hover:bg-medical-accent/20 text-sm"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
