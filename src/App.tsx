
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Frontend/pages/Index";
import NotFound from "./Frontend/pages/NotFound";
import ProductDetail from "./Frontend/pages/ProductDetail";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import VendorProfile from "./pages/VendorProfile";
import EditVendorProfile from "./pages/EditVendorProfile";
import Login from "./Frontend/pages/Login";
import Register from "./Frontend/pages/Register";
import CategoryPage from "./pages/CategoryPage";
import { AuthProvider } from "./Backend/contexts/AuthContext";
import CartPage from "./Frontend/pages/CartPage";
import UserProfile from "./Frontend/pages/UserProfile";
import CheckoutPage from "./Frontend/pages/CheckoutPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/vendor/:vendorId" element={<VendorProfile />} />
                <Route path="/vendor/:vendorId/edit" element={<EditVendorProfile />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
