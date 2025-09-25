import { FiHome, FiShoppingCart, FiUser } from 'react-icons/fi'; // 1. Changed icon import
import { Link, useLocation } from 'react-router-dom';

function BottomNavBar() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        
        <Link to="/customer-landing" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/customer-landing' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiHome size={24} />
          <span className={`text-xs ${activePath === '/customer-landing' ? 'font-bold' : ''}`}>Home</span>
        </Link>
        
        <Link to="/cart" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/cart' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiShoppingCart size={24} />
          <span className={`text-xs ${activePath === '/cart' ? 'font-bold' : ''}`}>Cart</span>
        </Link>

        {/* 2. Updated the link, icon, and text for Profile */}
        <Link to="/profile" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/profile' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiUser size={24} />
          <span className={`text-xs ${activePath === '/profile' ? 'font-bold' : ''}`}>Profile</span>
        </Link>
        
      </div>
    </div>
  );
}

export default BottomNavBar;