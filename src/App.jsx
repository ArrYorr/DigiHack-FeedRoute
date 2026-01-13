import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- LAYOUTS ---
// Ensure you have moved these files to the src/layouts folder
import MainLayout from "./layouts/MainLayout";
import FarmerLayout from "./layouts/FarmerLayout";

// --- PAGES ---
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin"; // Optional if you are using the unified Login
import SignupPage from "./pages/SignupPage";

// Customer Pages
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage"; 

// Farmer Pages
import FarmerLandingPage from "./pages/FarmerLandingPage"; // Or FarmerDashboard if you renamed it
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
        
        {/* Auth Routes */}
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* --- CUSTOMER ROUTES (Main Layout) --- */}
        <Route element={<MainLayout />}>
          <Route path="/customer-landing" element={<CustomerLandingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* --- FARMER ROUTES (Farmer Layout) --- */}
        <Route element={<FarmerLayout />}>
          <Route path="/farmer-dashboard" element={<FarmerLandingPage />} />
          
          {/* Orders */}
          <Route path="/farmer-orders" element={<FarmerOrdersPage />} />
          <Route path="/farmer-orders/:orderId" element={<FarmerOrdersPage />} />
          <Route path="/farmer-delivery/:orderId" element={<FarmerDeliveryPage />} />
          
          {/* Products */}
          <Route path="/farmer-products" element={<ProductUploadPage />} />
          {/* Note: This ID parameter matches the useParams in your details page */}
          <Route path="/farmer-products/:productId" element={<FarmerProductDetailPage />} />

          {/* Profile */}
          <Route path="/farmer-profile" element={<FarmerProfilePage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;