import { useNavigate, useOutletContext } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiTrash2, FiPlus, FiMinus, FiX } from 'react-icons/fi';

// This is a sub-component defined inside CartPage for simplicity
function CartItem({ item }) {
  const { updateItemQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
      <div className="relative">
        <img src={item.imageUrl || item.gallery[0]} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
        <button onClick={() => removeFromCart(item.id)} className="absolute top-1 right-1 bg-red-100 text-red-500 p-1 rounded-full">
          <FiTrash2 size={12} />
        </button>
      </div>
      <div className="flex-1 ml-4">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.poNumber}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-green-600">₦{(item.price * item.quantity).toLocaleString()}</p>
          <div className="flex items-center space-x-3">
            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="bg-gray-200 p-2 rounded-full"><FiMinus /></button>
            <span className="font-bold text-lg">{item.quantity}</span>
            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="bg-green-600 text-white p-2 rounded-full"><FiPlus /></button>
          </div>
        </div>
      </div>
    </div>
  );
}


function CartPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  // MODIFIED: Get the shared notification state and handler from the layout
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* --- Top Bar --- */}
      <header className="flex justify-between items-center p-4 bg-white border-b">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="font-bold text-lg">Cart</h1>
        {/* MODIFIED: This button is now fully functional */}
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </header>

      {/* --- Main Content --- */}
      <main className="p-4 pb-48">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* --- Footer with Totals and Buttons --- */}
      <footer className="fixed bottom-16 left-0 right-0 bg-white p-4 pt-6 shadow-lg rounded-t-2xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Total:</span>
          <span className="text-2xl font-bold">₦{total.toLocaleString()}</span>
        </div>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/checkout')} 
            className="w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition border-2 border-transparent"
          >
            Proceed to Order
          </button>
          <button className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-full hover:bg-gray-100 transition">
            Save
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CartPage;