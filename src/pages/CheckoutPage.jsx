import { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiChevronDown, FiMapPin } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

// Import data from your file
import { nigeriaLocations } from '../data/nigeriaData';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const { setCurrentPageTitle } = useOutletContext();
  
  const [step, setStep] = useState(1);
  
  // State for Form
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [availableLGAs, setAvailableLGAs] = useState([]);

  // State for Custom Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  // Refs for click outside logic
  const dropdownRef = useRef(null);

  useEffect(() => {
    setCurrentPageTitle("Checkout");
  }, [setCurrentPageTitle]);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Filter states based on search
  const filteredStates = Object.keys(nigeriaLocations).filter((state) =>
    state.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setStateSearch(state); // Set input text to selected state
    setAvailableLGAs(nigeriaLocations[state]); // Load LGAs
    setSelectedLGA(""); // Reset LGA
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleStateInputChange = (e) => {
    const val = e.target.value;
    setStateSearch(val);
    setIsDropdownOpen(true);
    
    // If user clears input, reset everything
    if (val === "") {
      setSelectedState("");
      setAvailableLGAs([]);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedState || !nigeriaLocations[selectedState]) {
      alert("Please select a valid State from the list.");
      return;
    }
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
      
      {/* Order Summary */}
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
        
        {/* --- CUSTOM SEARCHABLE STATE DROPDOWN --- */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-gray-700 font-bold mb-2">State</label>
          <div className="relative">
            <input 
              type="text"
              value={stateSearch}
              onChange={handleStateInputChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Select or Type State..."
              className="w-full border border-gray-300 bg-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
              required 
            />
            <FiChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* The Dropdown List */}
          {isDropdownOpen && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
              {filteredStates.length > 0 ? (
                filteredStates.sort().map((state) => (
                  <div 
                    key={state} 
                    onClick={() => handleStateSelect(state)}
                    className="p-3 hover:bg-green-50 cursor-pointer border-b border-gray-50 last:border-b-0 text-gray-700 flex items-center"
                  >
                    <FiMapPin className="mr-2 text-green-500" size={14} />
                    {state}
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-400 text-sm text-center">No state found</div>
              )}
            </div>
          )}
        </div>

        {/* --- LGA DROPDOWN --- */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Local Govt. Area</label>
          <select 
            value={selectedLGA}
            onChange={(e) => setSelectedLGA(e.target.value)}
            disabled={availableLGAs.length === 0} 
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${availableLGAs.length === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white'}`}
            required
          >
            <option value="">{availableLGAs.length > 0 ? "Select LGA" : "Select State First"}</option>
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