import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCamera, FiUser } from "react-icons/fi"; // Icons for the upload UI
import { nigeriaLocations } from '../data/nigeriaData';

function SignupPage() {
  const navigate = useNavigate();
  
  const [role, setRole] = useState("customer");
  
  // Location State
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [availableLGAs, setAvailableLGAs] = useState([]);

  // Profile Image State
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    farmName: "",
    contact: "", 
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedLGA(""); 
    setAvailableLGAs(nigeriaLocations[newState] || []);
  };

  // --- NEW: Image Upload Handler ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Stores image as a Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (role === "farmer") {
      // Save Farmer Data
      localStorage.setItem("farmerName", formData.fullName || "Farmer");
      localStorage.setItem("farmName", formData.farmName || "My Farm");
      localStorage.setItem("farmerPhone", formData.contact);
      if (profileImage) localStorage.setItem("farmerImage", profileImage); // Save Image
      
      if (selectedState && selectedLGA) {
        localStorage.setItem("farmerLocation", `${selectedLGA}, ${selectedState}`);
      } else {
        localStorage.setItem("farmerLocation", "Nigeria");
      }

      navigate("/farmer-dashboard");
    } else {
      // Save Customer Data
      localStorage.setItem("customerName", formData.fullName || "New Customer");
      localStorage.setItem("customerEmail", formData.contact);
      if (profileImage) localStorage.setItem("customerImage", profileImage); // Save Image
      
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

        {/* Role Toggle */}
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
          
          {/* --- NEW: PROFILE PICTURE UPLOAD --- */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <FiUser className="text-gray-400 text-4xl" />
                )}
              </div>
              <label 
                htmlFor="profile-upload" 
                className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 shadow-md transition-colors"
              >
                <FiCamera size={16} />
              </label>
              <input 
                id="profile-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
              />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 -mt-2 mb-4">Add a profile picture (optional)</p>

          {/* 1. Full Name */}
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

          {/* 2. Farm Name (Farmers only) */}
          {role === 'farmer' && (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">Farm Name</label>
              <input
                type="text"
                name="farmName"
                placeholder="Green Valley Farms"
                value={formData.farmName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          )}

          {/* 3. Contact */}
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

          {/* 4. Location (Farmers only) */}
          {role === 'farmer' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">State</label>
                <select 
                  value={selectedState}
                  onChange={handleStateChange}
                  className="w-full border border-gray-300 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(nigeriaLocations).sort().map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">LGA</label>
                <select 
                  value={selectedLGA}
                  onChange={(e) => setSelectedLGA(e.target.value)}
                  disabled={!selectedState}
                  className={`w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm ${!selectedState ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
                  required
                >
                  <option value="">Select LGA</option>
                  {availableLGAs.map((lga) => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 5. Password */}
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