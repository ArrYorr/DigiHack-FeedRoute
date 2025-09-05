import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiX } from 'react-icons/fi';
import { BsCheckSquareFill } from 'react-icons/bs';

// --- Mock Order Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';

const ordersData = {
  'GRB1234567890': {
    orderCode: 'GRB1234567890',
    date: 'Aug/23/2025',
    items: [
      { id: 1, name: 'Maize', poNumber: 'ST123', price: 7500, quantity: 2, imageUrl: cornImg },
      { id: 2, name: 'Tomatoes', poNumber: 'ST124', price: 10500, quantity: 3, imageUrl: tomatoesImg },
      { id: 3, name: 'Maize B', poNumber: 'ST129', price: 14000, quantity: 1, imageUrl: cornImg },
    ],
  },
  // Add other orders here
};
// --- End Mock Data ---

function FarmerOrdersPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();
  
  const [order, setOrder] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Simulate fetching order data based on the ID from the URL
    const fetchedOrder = ordersData[orderId];
    if (fetchedOrder) {
      setOrder(fetchedOrder);
      const initialChecks = {};
      fetchedOrder.items.forEach(item => {
        initialChecks[item.id] = false;
      });
      setCheckedItems(initialChecks);
    }
  }, [orderId]);

  const handleCheckItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };
  
  const handleProceedToLogistic = () => {
    navigate(`/farmer-delivery/${orderId}`);
  };

  if (!order) {
    return <div>Loading Order...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="sticky top-0 flex justify-between items-center p-4 bg-white border-b z-10">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="font-bold text-lg">Order</h1>
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </header>

      <main className="p-4 pb-48">
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-6">
          <p className="text-sm text-gray-500">Order code: <span className="text-gray-800 font-medium">{order.orderCode}</span></p>
          <p className="text-xs text-gray-400 mt-1">{order.date}</p>
        </div>
        
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
              <div className="relative">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="absolute top-1 left-1 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ₦{item.price.toLocaleString()}
                </div>
              </div>
              <div className="flex-1 ml-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.poNumber}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-600 text-sm">{item.quantity} Qty</p>
                  <button onClick={() => handleCheckItem(item.id)}>
                    {checkedItems[item.id] ? (
                      <BsCheckSquareFill className="text-green-600" size={24} />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-md"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-16 left-0 right-0 bg-white p-4 space-y-3 border-t">
        {/* MODIFIED: Added a transparent border to match the size of the button below */}
        <button 
          onClick={handleProceedToLogistic}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition border-2 border-transparent"
        >
          Proceed to Logistic
        </button>
        <button className="w-full border-2 border-green-600 text-green-600 font-bold py-3 rounded-xl hover:bg-green-50 transition">
          Place on Hold
        </button>
      </footer>
    </div>
  );
}

export default FarmerOrdersPage;