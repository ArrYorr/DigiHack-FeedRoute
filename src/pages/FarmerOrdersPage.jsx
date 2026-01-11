import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { FiChevronRight, FiPackage } from 'react-icons/fi';
import { BsCheckSquareFill } from 'react-icons/bs';

// --- Mock Order Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';

const ordersData = {
  'GRB1234567890': {
    orderCode: 'GRB1234567890',
    date: 'Aug/23/2025',
    status: 'Pending',
    items: [
      { id: 1, name: 'Maize', poNumber: 'ST123', price: 7500, quantity: 2, imageUrl: cornImg },
      { id: 2, name: 'Tomatoes', poNumber: 'ST124', price: 10500, quantity: 3, imageUrl: tomatoesImg },
      { id: 3, name: 'Maize B', poNumber: 'ST129', price: 14000, quantity: 1, imageUrl: cornImg },
    ],
  },
  'GRB9876543210': {
    orderCode: 'GRB9876543210',
    date: 'Aug/24/2025',
    status: 'Completed',
    items: [
      { id: 1, name: 'Rice Bags', poNumber: 'ST130', price: 45000, quantity: 10, imageUrl: cornImg },
    ],
  },
};

function FarmerOrdersPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  // Get setPageTitle
  const { setPageTitle } = useOutletContext();
  
  const [order, setOrder] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (orderId) {
      // If we are viewing a specific order
      setPageTitle("Order Details");
      
      const fetchedOrder = ordersData[orderId];
      if (fetchedOrder) {
        setOrder(fetchedOrder);
        const initialChecks = {};
        fetchedOrder.items.forEach(item => { initialChecks[item.id] = false; });
        setCheckedItems(initialChecks);
      }
    } else {
      // If we are viewing the list
      setPageTitle("My Orders");
    }
  }, [orderId, setPageTitle]);

  const handleCheckItem = (itemId) => {
    setCheckedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleProceedToLogistic = () => {
    navigate(`/farmer-delivery/${orderId}`);
  };

  // --- VIEW 1: ORDER LIST ---
  if (!orderId) {
    const ordersList = Object.values(ordersData);
    return (
      <div className="bg-gray-50 min-h-full p-4 space-y-4">
        {ordersList.map((ord) => (
          <div 
            key={ord.orderCode} 
            onClick={() => navigate(`/farmer-orders/${ord.orderCode}`)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <FiPackage size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{ord.orderCode}</h3>
                <p className="text-xs text-gray-500">{ord.date} • {ord.items.length} Items</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${ord.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                  {ord.status || 'Pending'}
                </span>
              </div>
            </div>
            <FiChevronRight className="text-gray-400" size={24} />
          </div>
        ))}
        {ordersList.length === 0 && <div className="text-center text-gray-400 mt-10">No orders found.</div>}
      </div>
    );
  }

  // --- VIEW 2: ORDER DETAILS ---
  if (!order) return <div className="p-10 text-center text-gray-500">Loading Order...</div>;

  return (
    <div className="bg-gray-50 min-h-full pb-32">
      <main className="p-4">
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
                    {checkedItems[item.id] ? <BsCheckSquareFill className="text-green-600" size={24} /> : <div className="w-6 h-6 border-2 border-gray-300 rounded-md"></div>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-20 left-4 right-4 space-y-3">
        <button onClick={handleProceedToLogistic} className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-md transition">
          Proceed to Logistic
        </button>
        <button className="w-full bg-white border-2 border-green-600 text-green-600 font-bold py-3 rounded-xl hover:bg-green-50 shadow-sm transition">
          Place on Hold
        </button>
      </footer>
    </div>
  );
}

export default FarmerOrdersPage;