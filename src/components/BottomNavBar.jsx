import { FiHome, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

function BottomNavBar() {
  const location = useLocation();
  const activePath = location.pathname;

  // Helper function to determine styling
  const getLinkClass = (path) => {
    const isActive = activePath === path;
    // Active: White text/icon. Inactive: Light Green text/icon.
    return `flex flex-col items-center transition-colors duration-200 ${
      isActive ? 'text-white scale-110' : 'text-green-200 hover:text-white'
    }`;
  };

  return (
    // CHANGED: bg-white -> bg-green-700, border-t -> border-green-800
    <div className="fixed bottom-0 left-0 right-0 bg-green-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-green-800 z-50">
      <div className="flex justify-around items-center h-16">
        
        <Link to="/customer-landing" className={getLinkClass('/customer-landing')}>
          <FiHome size={24} />
          <span className={`text-xs ${activePath === '/customer-landing' ? 'font-bold' : ''}`}>Home</span>
        </Link>
        
        <Link to="/cart" className={getLinkClass('/cart')}>
          <FiShoppingCart size={24} />
          <span className={`text-xs ${activePath === '/cart' ? 'font-bold' : ''}`}>Cart</span>
        </Link>

        <Link to="/profile" className={getLinkClass('/profile')}>
          <FiUser size={24} />
          <span className={`text-xs ${activePath === '/profile' ? 'font-bold' : ''}`}>Profile</span>
        </Link>
        
      </div>
    </div>
  );
}

export default BottomNavBar;