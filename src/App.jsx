import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import MainLayout from "./components/MainLayout";
import FarmerLayout from "./components/FarmerLayout";

// Page Components
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import FarmerLandingPage from "./pages/FarmerLandingPage";
import ProductUploadPage from "./pages/ProductUploadPage";
import FarmerOrdersPage from "./pages/FarmerOrdersPage";
import FarmerDeliveryPage from "./pages/FarmerDeliveryPage";
import FarmerProductDetailPage from "./pages/FarmerProductDetailPage.jsx"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (No Layout) --- */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />

        {/* --- Customer Private Routes (Uses MainLayout) --- */}
        <Route element={<MainLayout />}>
          <Route path="/customer-landing" element={<CustomerLandingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* --- Farmer Private Routes (Uses FarmerLayout) --- */}
        <Route element={<FarmerLayout />}>
          <Route path="/farmer-dashboard" element={<FarmerLandingPage />} />
          <Route path="/farmer-products" element={<ProductUploadPage />} />
          <Route path="/farmer-orders/:orderId" element={<FarmerOrdersPage />} />
          <Route path="/farmer-delivery/:orderId" element={<FarmerDeliveryPage />} />

          {/* 2. Added the dynamic route for the farmer's product detail page */}
          <Route path="/farmer-products/:productId" element={<FarmerProductDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;