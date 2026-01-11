import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import bgImage from "../assets/welcome-bg.jpg"; // Make sure this path is correct

function FarmerLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // --- KEY CHANGE: Save the name here ---
    localStorage.setItem("farmerName", "Musa Ibrahim");
    navigate('/farmer-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-900">
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative z-10 m-4">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Farmer Login</h2>
        <p className="text-center text-gray-500 mb-8">Welcome back! Log in to manage your crops.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="080 1234 5678"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            <div className="text-right mt-2">
              <a href="#" className="text-sm text-green-600 hover:underline">Forgot Password?</a>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition shadow-md"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-green-700 font-bold hover:underline">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default FarmerLogin;