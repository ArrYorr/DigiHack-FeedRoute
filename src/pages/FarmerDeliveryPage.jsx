import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiX, FiMapPin, FiChevronDown } from 'react-icons/fi';

// --- Mock Order Data ---
// In a real app, this data would come from your server
const ordersData = {
  'GRB1234567890': {
    orderCode: 'GRB1234567890',
    date: 'Aug/23/2025',
    total: 24900,
    deliveryFee: 2000,
    customer: {
      name: 'Peter Cole',
      email: 'petercole@gmail.com',
      phone: '08012345678',
    },
    dispatch: {
      name: 'Tunde Alex',
      id: 'KX123-DLX',
      phone: '08012345678',
      date: '12-14/06/2023',
    },
  },
};
// --- End Mock Data ---

function FarmerDeliveryPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();
  
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Simulate fetching order data
    setOrder(ordersData[orderId]);
  }, [orderId]);

  const handleSendTrack = () => {
    console.log(`Sending delivery track for order ${order.orderCode}`);
    alert('Delivery track sent!');
  };

  const handleWaitForPickup = () => {
    console.log(`Order ${order.orderCode} is now waiting for pickup.`);
    alert('Order status updated to "Waiting for Pickup"');
  };

  if (!order) {
    return <div>Loading Order Details...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* --- Top Bar --- */}
      <header className="sticky top-0 flex justify-between items-center p-4 bg-white border-b z-10">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="font-bold text-lg">Product</h1>
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </header>

      {/* --- Main Scrolling Content --- */}
      <main className="p-4 pb-48">
        {/* Order Code Bar */}
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-500">Order code: <span className="text-gray-800 font-medium">{order.orderCode}</span></p>
          <p className="text-xs text-gray-400">{order.date}</p>
        </div>
        
        <div className="space-y-4">
          {/* Delivery To Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
            <p className="text-xs text-gray-400">Delivery to</p>
            <h3 className="font-bold text-lg">{order.customer.name}</h3>
            <p className="text-sm text-gray-500">{order.customer.email}</p>
            <div className="relative">
              <input type="text" readOnly value={order.customer.phone} className="w-full bg-gray-100 rounded-md p-3 pr-10 text-gray-700" />
              <FiChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="Enter address or use location" 
                className="w-full bg-gray-100 rounded-md p-3 pr-10 text-gray-700" 
              />
              <FiMapPin className="absolute top-1/2 right-3 -translate-y-1/2 text-green-500" />
            </div>
          </div>

          {/* Dispatch Card */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-3">
            <p className="text-xs text-gray-400">Dispatch</p>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{order.dispatch.name}</h3>
              <div>
                <p className="text-xs text-gray-400 text-right">Date</p>
                <p className="font-medium text-gray-700">{order.dispatch.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{order.dispatch.id}</p>
            <div className="relative">
              <input type="text" readOnly value={order.dispatch.phone} className="w-full bg-gray-100 rounded-md p-3 pr-10 text-gray-700" />
              <FiMapPin className="absolute top-1/2 right-3 -translate-y-1/2 text-green-500" />
            </div>
          </div>

          {/* Totals Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <div className="flex justify-between text-gray-600">
              <p>Total Order:</p>
              <p className="font-semibold">₦{order.total.toLocaleString()}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Delivery fee:</p>
              <p className="font-semibold">₦{order.deliveryFee.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </main>

      {/* --- Footer with Action Buttons --- */}
      <footer className="fixed bottom-16 left-0 right-0 bg-white p-4 space-y-3 border-t">
        <button 
          onClick={handleSendTrack}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition"
        >
          Send Delivery Track
        </button>
        <button 
          onClick={handleWaitForPickup}
          className="w-full border-2 border-green-600 text-green-600 font-bold py-3 rounded-xl hover:bg-green-50 transition"
        >
          Wait for Pick up
        </button>
      </footer>
    </div>
  );
}

export default FarmerDeliveryPage;