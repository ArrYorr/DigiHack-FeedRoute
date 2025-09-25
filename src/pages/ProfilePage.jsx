import { useEffect } from 'react';
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

  // Set the page title in the shared header
  useEffect(() => {
    setCurrentPageTitle('Profile');
  }, [setCurrentPageTitle]);
  
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    console.log('User logging out...');
    navigate('/'); // Navigate back to the welcome page
  };

  return (
    <div className="p-4 space-y-6">
      {/* --- User Info Card --- */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <FiUser size={32} className="text-gray-500" />
        </div>
        <div className="flex-1 ml-4">
          <h2 className="font-bold text-lg text-gray-800">DigiHack</h2>
          <p className="text-sm text-gray-500">digihack@example.com</p>
        </div>
        <Link to="/edit-profile" className="text-sm font-semibold text-green-600">
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