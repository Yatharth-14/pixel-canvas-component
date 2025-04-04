
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from '@/Backend/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
}

// Helper function to get user initials
const getUserInitials = (user: { name?: string } | null): string => {
  if (!user || !user.name) return 'U';
  return user.name.split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!isOpen) return null;

  return (
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
            <div className="flex items-center space-x-3 px-3 py-3 bg-white rounded-md shadow-sm">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 break-words" style={{ maxWidth: "200px" }}>{user?.email}</p>
              </div>
            </div>
            <Link
              to="/profile"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded"
            >
              My Profile
            </Link>
            <Link
              to="/my-products"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded"
            >
              My Products
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2.5 text-red-600 hover:bg-red-50 rounded"
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
  );
};

export default MobileMenu;
