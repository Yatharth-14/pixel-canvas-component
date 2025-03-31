
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";
import VendorProfile from "./pages/VendorProfile";
import EditVendorProfile from "./pages/EditVendorProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/vendor/:vendorId" element={<VendorProfile />} />
            <Route path="/vendor/:vendorId/edit" element={<EditVendorProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
