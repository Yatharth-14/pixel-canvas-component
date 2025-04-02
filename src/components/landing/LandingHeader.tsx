
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationsDropdown from '../header/NotificationsDropdown';
import CartDropdown from '../header/CartDropdown';
import { useAuth } from '@/Backend/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top Navigation Bar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-medical-primary">
              IndiaMart
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NotificationsDropdown />
            <CartDropdown />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/my-products">My Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <NotificationsDropdown />
            <CartDropdown />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-2">
          <div className="py-2">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full border-gray-300"
            />
          </div>
          <nav className="space-y-2 py-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-products"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  My Products
                </Link>
                <Link
                  to="/my-account"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* Category Navigation */}
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
      
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </header>
  );
};

export default LandingHeader;
