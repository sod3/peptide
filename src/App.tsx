import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Terms from "./pages/Terms.tsx";
import Privacy from "./pages/Privacy.tsx";
import Shipping from "./pages/Shipping.tsx";
import Checkout from "./pages/Checkout.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminInventory from "./pages/admin/Inventory.tsx";
import AdminAddProduct from "./pages/admin/AddProduct.tsx";
import AdminLogin from "./pages/admin/Login.tsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { AgeGate } from "./components/AgeGate.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner position="top-right" expand={false} richColors />
          <BrowserRouter>
            <AgeGate />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['owner', 'admin', 'manager']}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="inventory" element={<AdminInventory />} />
                <Route path="inventory/add" element={<AdminAddProduct />} />
                <Route path="orders" element={<div>Orders Page (Coming Soon)</div>} />
                <Route path="customers" element={<div>Customers Page (Coming Soon)</div>} />
                <Route path="analytics" element={<div>Analytics Page (Coming Soon)</div>} />
                <Route path="settings" element={<div>Settings Page (Coming Soon)</div>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
