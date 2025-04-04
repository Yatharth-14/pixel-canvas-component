
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsDropdown from '../header/NotificationsDropdown';
import CartDropdown from '../header/CartDropdown';
import UserMenu from '../header/UserMenu';
import MobileMenu from '../header/MobileMenu';
import SearchBar from '../header/SearchBar';
import CategoryNav from '../header/CategoryNav';

const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

          {/* Search Bar */}
          <SearchBar />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NotificationsDropdown />
            <CartDropdown />
            <UserMenu />
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
      <MobileMenu isOpen={mobileMenuOpen} />

      {/* Category Navigation */}
      <CategoryNav />
      
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
