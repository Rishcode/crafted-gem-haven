import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CategoryProducts from "./pages/CategoryProducts";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import SellerRegistration from "./pages/SellerRegistration";
import SellerVerification from "./pages/SellerVerification";
import SellerDashboard from "./pages/SellerDashboard";
import Sellers from "./pages/Sellers";
import SellerProfile from "./pages/SellerProfile";
import AdminSellerVerification from "./pages/AdminSellerVerification";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<CategoryProducts />} />
              <Route path="/all-products" element={<CategoryProducts />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/seller/register" element={<SellerRegistration />} />
              <Route path="/seller/verification/:sellerId" element={<SellerVerification />} />
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
              <Route path="/sellers" element={<Sellers />} />
              <Route path="/seller/:sellerId" element={<SellerProfile />} />
              <Route path="/admin/seller-verification" element={<AdminSellerVerification />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
