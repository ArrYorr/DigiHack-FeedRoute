import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

// 1. Import the data from your new file
import { nigeriaLocations } from '../data/nigeriaData';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const { setCurrentPageTitle } = useOutletContext();
  
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [availableLGAs, setAvailableLGAs] = useState([]);

  useEffect(() => {
    setCurrentPageTitle("Checkout");
  }, [setCurrentPageTitle]);

  // --- 2. SEARCH LOGIC ---
  const handleStateInput = (e) => {
    const val = e.target.value;
    setSelectedState(val);

    // Check if the typed value matches a real state (Case-insensitive check)
    // This allows "lagos" to match "Lagos"
    const match = Object.keys(nigeriaLocations).find(
      (state) => state.toLowerCase() === val.toLowerCase()
    );

    if (match) {
      setAvailableLGAs(nigeriaLocations[match]);
      setSelectedLGA(""); // Reset LGA if they change state
    } else {
      setAvailableLGAs([]); // Clear LGAs if state is invalid/typing
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validation: Ensure they actually picked a valid state
    const isValidState = Object.keys(nigeriaLocations).some(
      (s) => s.toLowerCase() === selectedState.toLowerCase()
    );

    if (!isValidState) {
      alert("Please select a valid State from the list.");
      return;
    }

    // Validation: Ensure LGA is selected
    if (!selectedLGA) {
      alert("Please select your Local Government Area.");
      return;
    }

    setTimeout(() => {
      setStep(2);
    }, 1000);
  };

  if (step === 2) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center pb-24">
        <FiCheckCircle className="text-green-600 w-24 h-24 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8">
          Your order has been successfully placed. We will deliver to <strong>{selectedLGA}, {selectedState}</strong> soon.
        </p>
        <button 
          onClick={() => navigate('/customer-landing')}
          className="w-full bg-green-700 text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full pb-24 p-4">
      
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
        
        {/* --- 3. SEARCHABLE STATE INPUT --- */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">State</label>
          <div className="relative">
            <input 
              list="nigeria-states" 
              value={selectedState} 
              onChange={handleStateInput}
              placeholder="Type to search state..."
              className="w-full border border-gray-300 bg-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            
            {/* The Hidden List of Options that appears when typing */}
            <datalist id="nigeria-states">
              {Object.keys(nigeriaLocations).sort().map((state) => (
                <option key={state} value={state} />
              ))}
            </datalist>
          </div>
        </div>

        {/* 4. LGA DROPDOWN (Auto-updates based on State) */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Local Govt. Area</label>
          <select 
            value={selectedLGA}
            onChange={(e) => setSelectedLGA(e.target.value)}
            disabled={availableLGAs.length === 0} 
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${availableLGAs.length === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
            required
          >
            <option value="">{availableLGAs.length > 0 ? "Select LGA" : "Type a valid State first"}</option>
            {availableLGAs.map((lga) => (
              <option key={lga} value={lga}>{lga}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Street Address / Landmark</label>
          <textarea 
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="2"
            placeholder="e.g., No. 5 Market Road, near Central Mosque"
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