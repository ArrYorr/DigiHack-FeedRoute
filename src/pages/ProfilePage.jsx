import { useEffect, useState } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { FiUser, FiChevronRight, FiLogOut, FiShoppingBag, FiMapPin, FiCreditCard, FiHelpCircle } from 'react-icons/fi';

// A small reusable component for the links
function ProfileLink({ icon, text, to }) {
  return (
    <Link to={to} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition">
      <div className="flex items-center">
        {icon}
        <span className="ml-4 font-semibold text-gray-700">{text}</span>
      </div>
      <FiChevronRight className="text-gray-400" />
    </Link>
  );
}

function ProfilePage() {
  const { setCurrentPageTitle } = useOutletContext();
  const navigate = useNavigate();

  // 1. State for dynamic user info
  const [customerName, setCustomerName] = useState("Customer");
  const [customerEmail, setCustomerEmail] = useState("customer@example.com");

  // Set the page title and load data
  useEffect(() => {
    setCurrentPageTitle('Profile');
    
    // 2. Fetch data from Local Storage
    const storedName = localStorage.getItem("customerName");
    const storedEmail = localStorage.getItem("customerEmail");

    if (storedName) setCustomerName(storedName);
    if (storedEmail) setCustomerEmail(storedEmail);
  }, [setCurrentPageTitle]);
  
  const handleLogout = () => {
    // Clear the stored data on logout
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerEmail");
    
    console.log('User logging out...');
    navigate('/'); 
  };

  return (
    <div className="p-4 space-y-6">
      {/* --- User Info Card --- */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-green-100 overflow-hidden">
          <FiUser size={32} className="text-gray-500" />
        </div>
        <div className="flex-1 ml-4">
          {/* 3. Display Dynamic Info */}
          <h2 className="font-bold text-lg text-gray-800">{customerName}</h2>
          <p className="text-sm text-gray-500">{customerEmail}</p>
        </div>
        <Link to="/edit-profile" className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
          Edit
        </Link>
      </div>

      {/* --- Navigation Links --- */}
      <div className="space-y-3">
        <ProfileLink icon={<FiShoppingBag size={20} className="text-gray-500" />} text="My Orders" to="/my-orders" />
        <ProfileLink icon={<FiMapPin size={20} className="text-gray-500" />} text="Shipping Addresses" to="/addresses" />
        <ProfileLink icon={<FiCreditCard size={20} className="text-gray-500" />} text="Payment Methods" to="/payment-methods" />
        <ProfileLink icon={<FiHelpCircle size={20} className="text-gray-500" />} text="Help & Support" to="/support" />
      </div>
      
      {/* --- Logout Button --- */}
      <div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center p-4 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition"
        >
          <FiLogOut className="mr-3" />
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;