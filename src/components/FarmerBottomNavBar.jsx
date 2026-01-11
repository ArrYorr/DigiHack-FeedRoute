import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiClipboard, FiUser } from 'react-icons/fi';

function FarmerBottomNavBar() {
  const location = useLocation();
  const activePath = location.pathname;

  const getLinkClass = (pathPrefix) => {
    // Check if the current path starts with the link's path (for nested routes like /farmer-orders/123)
    const isActive = activePath.startsWith(pathPrefix);
    return `flex flex-col items-center transition-colors duration-200 ${
      isActive ? 'text-white scale-110' : 'text-green-200 hover:text-white'
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-green-800 z-50">
      <div className="flex justify-around items-center h-16">
        
        {/* 1. HOME BUTTON */}
        <Link to="/farmer-dashboard" className={getLinkClass('/farmer-dashboard')}>
          <FiHome size={24} />
          <span className={`text-xs ${activePath.startsWith('/farmer-dashboard') ? 'font-bold' : ''}`}>Home</span>
        </Link>
        
        {/* 2. ORDERS BUTTON */}
        <Link to="/farmer-orders" className={getLinkClass('/farmer-orders')}>
          <FiClipboard size={24} />
          <span className={`text-xs ${activePath.startsWith('/farmer-orders') ? 'font-bold' : ''}`}>Orders</span>
        </Link>

        {/* 3. PROFILE BUTTON */}
        <Link to="/farmer-profile" className={getLinkClass('/farmer-profile')}>
          <FiUser size={24} />
          <span className={`text-xs ${activePath.startsWith('/farmer-profile') ? 'font-bold' : ''}`}>Profile</span>
        </Link>
        
      </div>
    </div>
  );
}

export default FarmerBottomNavBar;