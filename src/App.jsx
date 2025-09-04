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
          {/* Add other farmer pages like /farmer-products and /farmer-orders here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;