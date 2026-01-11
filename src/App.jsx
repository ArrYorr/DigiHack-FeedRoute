import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import MainLayout from "./components/MainLayout";
import FarmerLayout from "./components/FarmerLayout";

// Page Components
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import LoginPage from "./pages/LoginPage"; // ADDED: The generic login page you just sent
import SignupPage from "./pages/SignupPage"; // ADDED: The signup page

import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage"; 
import FarmerLandingPage from "./pages/FarmerLandingPage";
import ProductUploadPage from "./pages/ProductUploadPage";
import FarmerOrdersPage from "./pages/FarmerOrdersPage";
import FarmerDeliveryPage from "./pages/FarmerDeliveryPage";
import FarmerProductDetailPage from "./pages/FarmerProductDetailPage";
import FarmerProfilePage from "./pages/FarmerProfilePage"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (No Layout) --- */}
        <Route path="/" element={<WelcomePage />} />
        
        {/* Specific Login Pages */}
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />

        {/* General Auth Pages */}
        <Route path="/login" element={<LoginPage />} /> {/* Link from Signup goes here */}
        <Route path="/signup" element={<SignupPage />} />

        {/* --- Customer Private Routes (Uses MainLayout) --- */}
        <Route element={<MainLayout />}>
          <Route path="/customer-landing" element={<CustomerLandingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* --- Farmer Private Routes (Uses FarmerLayout) --- */}
        <Route element={<FarmerLayout />}>
          <Route path="/farmer-dashboard" element={<FarmerLandingPage />} />
          
          {/* Orders Routes */}
          <Route path="/farmer-orders" element={<FarmerOrdersPage />} />
          <Route path="/farmer-orders/:orderId" element={<FarmerOrdersPage />} />
          
          <Route path="/farmer-delivery/:orderId" element={<FarmerDeliveryPage />} />
          
          {/* Product Routes */}
          <Route path="/farmer-products" element={<ProductUploadPage />} />
          <Route path="/farmer-products/:productId" element={<FarmerProductDetailPage />} />

          {/* Profile Route */}
          <Route path="/farmer-profile" element={<FarmerProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;