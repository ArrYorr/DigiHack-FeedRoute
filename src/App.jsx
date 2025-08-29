import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Component
import MainLayout from "./components/MainLayout"; 

// Page Components
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage"; // Import checkout page

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes (No Nav Bar) --- */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />

        {/* --- Private Routes (These will have the Bottom Nav Bar) --- */}
        <Route element={<MainLayout />}>
          <Route path="/customer-landing" element={<CustomerLandingPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* You can add routes for Cart, Wallets, etc. here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;