import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout"; 

// Import your pages
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProductDetailPage from "./pages/ProductDetailPage"; // 1. Import the new page

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />

        {/* --- Private Routes with Nav Bar --- */}
        <Route element={<MainLayout />}>
          <Route path="/customer-landing" element={<CustomerLandingPage />} />
          
          {/* 2. Add the new dynamic route for product details */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;