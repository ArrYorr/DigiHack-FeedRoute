import { FiHome, FiShoppingCart, FiCreditCard } from 'react-icons/fi';
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

        <Link to="/wallets" className={`flex flex-col items-center transition-colors duration-200 ${activePath === '/wallets' ? 'text-green-600' : 'text-gray-400'}`}>
          <FiCreditCard size={24} />
          <span className={`text-xs ${activePath === '/wallets' ? 'font-bold' : ''}`}>Wallets</span>
        </Link>
        
      </div>
    </div>
  );
}

export default BottomNavBar;