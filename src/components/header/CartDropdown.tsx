
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/Backend/contexts/AuthContext';
import { CartItem, getCartItems, updateCartQuantity, removeFromCart, getCartCount } from '@/Backend/services/cart';
import { toast } from '@/hooks/use-toast';

const CartDropdown = () => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchCartItems = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    const items = await getCartItems();
    setCartItems(items);
    setIsLoading(false);
  };

  const fetchCartCount = async () => {
    if (!isAuthenticated) return;
    const count = await getCartCount();
    setCartCount(count);
  };

  useEffect(() => {
    fetchCartCount();
    // Only fetch cart items if dropdown is open
    if (isOpen) {
      fetchCartItems();
    }
  }, [isAuthenticated, isOpen]);

  const handleUpdateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    await updateCartQuantity(cartItemId, quantity);
    await fetchCartItems();
    await fetchCartCount();
  };

  const handleRemoveItem = async (cartItemId: string) => {
    await removeFromCart(cartItemId);
    setCartItems(cartItems.filter(item => item.id !== cartItemId));
    await fetchCartCount();
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart"
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.discounted_price || item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center bg-medical-accent text-white rounded-full text-xs px-1.5">
              {cartCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4" align="end">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Your Cart</h3>
          <span className="text-sm text-gray-500">{cartCount} item(s)</span>
        </div>
        <Separator className="mb-3" />
        
        {!isAuthenticated ? (
          <div className="flex flex-col items-center py-6 text-center">
            <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500 mb-4">Please log in to see your cart</p>
            <Link to="/login">
              <Button className="bg-medical-primary hover:bg-medical-primary/90">
                Login
              </Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-medical-primary"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center py-6 text-center">
            <ShoppingCart className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-500 mb-3">Your cart is empty</p>
            <Link to="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="max-h-60 overflow-y-auto mb-3 space-y-3">
              {cartItems.map((item) => {
                const product = item.product;
                const primaryImage = product?.images?.find(img => img.is_primary)?.image_url || 
                                    product?.images?.[0]?.image_url;
                                    
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                      {primaryImage && (
                        <img 
                          src={primaryImage} 
                          alt={product?.name} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${product?.id}`} 
                        className="font-medium text-sm truncate hover:text-medical-primary"
                      >
                        {product?.name}
                      </Link>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-6 w-6 rounded-full p-0"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{((product?.discounted_price || product?.price || 0) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">₹{calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <Link to="/cart" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" className="flex-1">
                <Button className="w-full bg-medical-primary hover:bg-medical-primary/90">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
