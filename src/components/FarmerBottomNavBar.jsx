import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiClipboard } from 'react-icons/fi';

function FarmerBottomNavBar() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        
        <Link to="/farmer-dashboard" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/farmer-dashboard' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiHome size={24} />
          <span className={`text-xs ${activePath === '/farmer-dashboard' ? 'font-bold' : ''}`}>Home</span>
        </Link>
        
        <Link to="/farmer-products" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/farmer-products' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiPackage size={24} />
          <span className={`text-xs ${activePath === '/farmer-products' ? 'font-bold' : ''}`}>Products</span>
        </Link>

        <Link to="/farmer-orders" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/farmer-orders' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiClipboard size={24} />
          <span className={`text-xs ${activePath === '/farmer-orders' ? 'font-bold' : ''}`}>Order</span>
        </Link>
        
      </div>
    </div>
  );
}

export default FarmerBottomNavBar;