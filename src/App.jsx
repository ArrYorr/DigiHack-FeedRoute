import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your new layout component
import MainLayout from "./components/MainLayout"; 

// Import your pages
import WelcomePage from "./pages/WelcomePage";
import CustomerLogin from "./pages/CustomerLogin";
import FarmerLogin from "./pages/FarmerLogin";
import CustomerLandingPage from "./pages/CustomerLandingPage";

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
          {/* Add other pages that need the nav bar here, e.g.: */}
          {/* <Route path="/cart" element={<CartPage />} /> */}
          {/* <Route path="/wallets" element={<WalletsPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;