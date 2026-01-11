import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  
  // State to track if user is registering as 'customer' or 'farmer'
  const [role, setRole] = useState("customer");
  
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "", // Will be email for customer, phone for farmer
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Logic to register based on selected role
    if (role === "farmer") {
      // 1. Save Farmer Name
      localStorage.setItem("farmerName", formData.fullName || "New Farmer");
      // 2. Redirect to Farmer Dashboard
      navigate("/farmer-dashboard");
    } else {
      // 1. Save Customer Name
      localStorage.setItem("customerName", formData.fullName || "New Customer");
      // 2. Redirect to Customer Landing
      navigate("/customer-landing");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us as a {role === 'customer' ? 'Buyer' : 'Farmer'}
        </p>

        {/* --- ROLE TOGGLE BUTTONS --- */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setRole("customer")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              role === "customer"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            I am a Customer
          </button>
          <button
            type="button"
            onClick={() => setRole("farmer")}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              role === "farmer"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            I am a Farmer
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              {role === 'customer' ? 'Email Address' : 'Phone Number'}
            </label>
            <input
              type={role === 'customer' ? 'email' : 'tel'}
              name="contact"
              placeholder={role === 'customer' ? 'you@example.com' : '080 1234 5678'}
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition mt-4"
          >
            Sign Up as {role === 'customer' ? 'Customer' : 'Farmer'}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-green-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;