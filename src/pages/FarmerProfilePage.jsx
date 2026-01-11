import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FiPackage, FiSettings, FiLogOut, FiChevronRight, FiMapPin, FiPhone } from "react-icons/fi";

function FarmerProfilePage() {
  const { setPageTitle } = useOutletContext();
  const [farmerName, setFarmerName] = useState("Farmer");

  useEffect(() => {
    setPageTitle("My Profile");
    const storedName = localStorage.getItem("farmerName");
    if (storedName) setFarmerName(storedName);
  }, [setPageTitle]);

  return (
    <div className="min-h-full bg-gray-50">
      
      {/* Profile Card Section */}
      <div className="p-4 pt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-green-100 overflow-hidden mb-4">
             {/* Placeholder for Profile Image */}
             <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{farmerName}</h2>
          <p className="text-gray-500 text-sm">Green Valley Farms</p>
          
          <div className="mt-4 flex flex-col gap-2 w-full">
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <FiMapPin className="text-green-600" /> Kuje, Abuja
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
              <FiPhone className="text-green-600" /> +234 801 234 5678
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-24">
        {/* Manage Products Link */}
        <Link 
          to="/farmer-products" 
          className="flex items-center justify-between bg-green-600 text-white p-5 rounded-xl shadow-md mb-6 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <FiPackage size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">My Products</h3>
              <p className="text-xs opacity-90">Upload & manage crops</p>
            </div>
          </div>
          <FiChevronRight size={24} />
        </Link>

        {/* Settings List */}
        <h3 className="text-gray-500 font-bold text-sm mb-3 uppercase tracking-wider ml-1">Account</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <FiSettings className="text-gray-400" size={20} />
              <span className="text-gray-700">Settings</span>
            </div>
            <FiChevronRight className="text-gray-300" />
          </button>
          
          <button 
             onClick={() => { localStorage.clear(); window.location.href = '/'; }}
             className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 font-semibold"
          >
            <FiLogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfilePage;