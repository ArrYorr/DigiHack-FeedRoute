import { useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  const { setCurrentPageTitle } = useOutletContext();

  useEffect(() => {
    setCurrentPageTitle("My Cart");
  }, [setCurrentPageTitle]);

  return (
    <div className="bg-gray-50 min-h-full pb-24 p-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/customer-landing" className="text-green-600 font-bold">Start Shopping</Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-green-600 font-semibold">₦{item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-100 rounded text-gray-600 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">₦{cartTotal.toLocaleString()}</span>
            </div>
            
            {/* REMOVED: Delivery Fee Section */}
            
            <div className="border-t pt-2 flex justify-between text-lg font-bold text-green-800">
              <span>Total</span>
              {/* UPDATED: Total is now just the cartTotal */}
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-green-700 text-white font-bold py-4 rounded-xl mt-6 shadow-md hover:bg-green-800 transition"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;