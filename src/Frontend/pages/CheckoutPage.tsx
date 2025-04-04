
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../Backend/services/cart";
import { useAuth } from "../../Backend/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Check, ArrowLeft, Building, Home, User, Phone, MapPin } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      const discountedPrice = item.product?.discounted_price || price;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // In a real app, this would process the order with Supabase
      // This is just a simulation for the demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed. Thank you for shopping with us!",
      });
      
      navigate("/profile");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Order failed",
        description: "Failed to place your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">You need to add items to your cart before checkout.</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            to="/cart" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5" /> Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name} 
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email} 
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={formData.phone} 
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" /> Shipping Address
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={formData.address} 
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={formData.city} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input 
                          id="state" 
                          name="state"
                          value={formData.state} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input 
                          id="pincode" 
                          name="pincode"
                          value={formData.pincode} 
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label className="mb-2 block">Address Type</Label>
                      <RadioGroup 
                        defaultValue={formData.addressType}
                        onValueChange={(value) => setFormData({...formData, addressType: value})}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="home" id="home" />
                          <Label htmlFor="home" className="flex items-center">
                            <Home className="h-4 w-4 mr-1" /> Home
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="work" id="work" />
                          <Label htmlFor="work" className="flex items-center">
                            <Building className="h-4 w-4 mr-1" /> Work
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Payment Method
                  </h2>
                  
                  <RadioGroup 
                    defaultValue={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="border rounded-md p-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 font-medium">Cash on Delivery</Label>
                      </div>
                      <div className="mt-2 pl-6 text-sm text-gray-500">
                        Pay with cash when your order is delivered.
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 opacity-60">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" disabled />
                        <Label htmlFor="card" className="flex-1 font-medium text-gray-400">
                          Credit/Debit Card (Coming Soon)
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="block md:hidden">
                <OrderSummary cartItems={cartItems} />
                <Button 
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Check className="mr-2 h-5 w-5" /> Place Order
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <OrderSummary cartItems={cartItems} />
              <Button 
                onClick={handleSubmit}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-lg py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Check className="mr-2 h-5 w-5" /> Place Order
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order summary component to avoid repetition
const OrderSummary = ({ cartItems }: { cartItems: any[] }) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      const discountedPrice = item.product?.discounted_price || price;
      return total + (discountedPrice * item.quantity);
    }, 0);
  };
  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded">
              {item.product?.images && item.product.images.length > 0 ? (
                <img 
                  src={item.product.images.find((img: any) => img.is_primary)?.image_url || item.product.images[0].image_url} 
                  alt={item.product?.name}
                  className="w-full h-full object-cover rounded" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Phone className="text-gray-400" size={16} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.product?.name}</h3>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium">
                ₹{item.product?.discounted_price || item.product?.price || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>₹{calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>₹{(calculateSubtotal() * 0.18).toFixed(2)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{(calculateSubtotal() * 1.18).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
