
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems, removeFromCart, updateCartQuantity } from "../../Backend/services/cart";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { data: cartItems = [], refetch: refetchCart, isLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleUpdateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(cartItemId);
    try {
      const success = await updateCartQuantity(cartItemId, newQuantity);
      if (success) {
        await refetchCart();
        toast({
          title: "Cart updated",
          description: "Your cart has been updated successfully",
        });
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update item quantity",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        title: "Update failed",
        description: "An error occurred while updating your cart",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRemoveItem = async (cartItemId: string) => {
    setIsUpdating(cartItemId);
    try {
      const success = await removeFromCart(cartItemId);
      if (success) {
        await refetchCart();
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart",
        });
      } else {
        toast({
          title: "Remove failed",
          description: "Failed to remove item from cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Remove failed",
        description: "An error occurred while removing the item",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      const discountedPrice = item.product?.discounted_price || price;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag size={64} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
                </div>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          {item.product?.images && item.product.images.length > 0 ? (
                            <img 
                              src={item.product.images.find(img => img.is_primary)?.image_url || item.product.images[0].image_url} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <ShoppingBag className="text-gray-400" size={32} />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {item.product?.name || "Product unavailable"}
                          </h3>
                          {item.product?.brand && (
                            <p className="text-sm text-gray-500">Brand: {item.product.brand}</p>
                          )}
                          <div className="mt-1">
                            {item.product?.discounted_price ? (
                              <div className="flex items-center">
                                <span className="text-lg font-medium text-gray-900">
                                  ₹{item.product.discounted_price}
                                </span>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  ₹{item.product.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-medium text-gray-900">
                                ₹{item.product?.price || 0}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full" 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={!!isUpdating || item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            disabled={!!isUpdating}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center">
                          <Button 
                            variant="destructive"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={!!isUpdating}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{calculateSubtotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link to="/checkout">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2">
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="mt-4">
                  <Link to="/" className="text-blue-600 hover:underline text-sm flex items-center justify-center gap-1">
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
