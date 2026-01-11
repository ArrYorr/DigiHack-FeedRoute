import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartTotal } = useCart();
  
  // 1. Get the layout function to set the title
  const { setCurrentPageTitle } = useOutletContext();
  
  const [step, setStep] = useState(1); // 1 = Form, 2 = Success

  // 2. Set the Global Header Title
  useEffect(() => {
    setCurrentPageTitle("Checkout");
  }, [setCurrentPageTitle]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  // --- SUCCESS VIEW ---
  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center pb-24">
        <FiCheckCircle className="text-green-600 w-24 h-24 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8">Your order has been successfully placed. You will receive a confirmation soon.</p>
        <button 
          onClick={() => navigate('/customer-landing')}
          className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="bg-gray-50 min-h-full pb-24 p-4">
      {/* ❌ OLD HEADER REMOVED FROM HERE */}
      
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between py-2 text-sm">
            <span className="text-gray-600">{item.quantity}x {item.name}</span>
            <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between font-bold text-lg text-green-700">
          <span>Total</span>
          <span>₦{cartTotal.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">Delivery Address</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="3"
            placeholder="Enter your full address..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input 
            type="tel" 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="080..."
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-green-700 text-white font-bold py-4 rounded-xl mt-4 shadow-md hover:bg-green-800 transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;