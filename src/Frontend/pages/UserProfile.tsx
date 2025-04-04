
import React, { useState } from "react";
import { useAuth } from "../../Backend/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { User, LogOut, ShoppingBag, MapPin, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "../../Backend/supabase/client";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', user?.id);
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "Failed to update profile information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <User size={40} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            
            <nav className="space-y-1">
              <Link to="/profile" className="block px-4 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">
                Profile Information
              </Link>
              <Link to="/cart" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                My Cart
              </Link>
              <Link to="/my-products" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                My Products
              </Link>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-4"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </aside>
          
          <div className="flex-1">
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          value={email} 
                          disabled 
                          className="bg-gray-50"
                        />
                        <p className="text-sm text-gray-500">Email cannot be changed</p>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="orders" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Your Orders</h3>
                  </div>
                  
                  <div className="text-center py-8">
                    <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No orders yet</h4>
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link to="/">
                      <Button variant="outline">Start Shopping</Button>
                    </Link>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="addresses" className="mt-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Your Addresses</h3>
                    <Button variant="outline" size="sm">Add New Address</Button>
                  </div>
                  
                  <div className="text-center py-8">
                    <MapPin className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h4 className="text-lg font-medium mb-2">No saved addresses</h4>
                    <p className="text-gray-500 mb-4">You haven't added any delivery addresses yet.</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
