import { useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiX } from 'react-icons/fi';

import flutterwaveLogo from '../assets/flutterwave-logo.png';
import paystackLogo from '../assets/paystack-logo.png';

function CheckoutPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();
  
  const [selectedGateway, setSelectedGateway] = useState('paystack');

  // Check if we are ordering a specific item directly or the whole cart
  const itemsToOrder = location.state?.orderItems || cartItems;
  const total = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderCode = `GRB${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const handlePayment = () => {
    console.log(`Proceeding to payment with ${selectedGateway} for a total of ₦${total}`);
    alert(`Initiating payment with ${selectedGateway}...`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="font-bold text-lg">Order</h1>
        <button onClick={handleNotificationToggle} className="relative text-gray-600 z-20">
          {isNotificationsOpen ? <FiX size={24} /> : <FiBell size={24} />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </header>

      <main className="p-4 pb-48">
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
          <p className="text-sm text-gray-500">Order code: <span className="text-gray-800 font-medium">{orderCode}</span></p>
          <p className="text-xs text-gray-400 mt-1">{new Date().toLocaleDateString('en-GB')}</p>
        </div>

        <div className="bg-green-100/50 border border-green-200 text-green-800 text-3xl font-bold p-6 rounded-lg text-center mb-6 shadow-sm">
          ₦{total.toLocaleString()}
        </div>

        <div className="space-y-4">
          <p className="font-semibold text-gray-700">Please choose your payment gateways</p>
          <button 
            onClick={() => setSelectedGateway('flutterwave')}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${selectedGateway === 'flutterwave' ? 'border-green-500 bg-white' : 'border-gray-200 bg-white'}`}
          >
            <div className="flex items-center"><img src={flutterwaveLogo} alt="Flutterwave" className="h-6" /></div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedGateway === 'flutterwave' ? 'border-green-500' : 'border-gray-300'}`}>
              {selectedGateway === 'flutterwave' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
            </div>
          </button>
          <button 
            onClick={() => setSelectedGateway('paystack')}
            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition ${selectedGateway === 'paystack' ? 'border-green-500 bg-white' : 'border-gray-200 bg-white'}`}
          >
            <div className="flex items-center"><img src={paystackLogo} alt="Paystack" className="h-5" /></div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedGateway === 'paystack' ? 'border-green-500' : 'border-gray-300'}`}>
              {selectedGateway === 'paystack' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
            </div>
          </button>
        </div>
      </main>

      <footer className="fixed bottom-16 left-0 right-0 bg-white p-4 space-y-3 border-t">
        <button 
          onClick={handlePayment} 
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition border-2 border-transparent"
        >
          Proceed to Payment
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="w-full border-2 border-red-400 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition"
        >
          Cancel
        </button>
      </footer>
    </div>
  );
}

export default CheckoutPage;