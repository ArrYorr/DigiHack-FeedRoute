import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiSearch, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import BottomNavBar from '../components/BottomNavBar';
import NotificationPanel from '../components/NotificationPanel';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';
import carrotsImg from '../assets/carrots.jpg';
import berriesImg from '../assets/berries.jpg';

const allProducts = [
  { id: 1, name: 'Maize', price: 100, imageUrl: cornImg, category: 'Products' },
  { id: 2, name: 'Tomatoes', price: 180, imageUrl: tomatoesImg, category: 'Vegetables' },
  { id: 3, name: 'Carrots', price: 150, imageUrl: carrotsImg, category: 'Tubers' },
  { id: 4, name: 'Berries', price: 250, imageUrl: berriesImg, category: 'Fruits' },
  { id: 5, name: 'Extra Maize', price: 110, imageUrl: cornImg, category: 'Products' },
  { id: 6, name: 'More Berries', price: 260, imageUrl: berriesImg, category: 'Fruits' },
];

const categories = ['Products', 'Fruits', 'Legumes', 'Tubers', 'Vegetables'];
// --- End of Mock Data ---


function CustomerLandingPage() {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState('Products');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [newPostCount, setNewPostCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // --- Effects ---
  useEffect(() => {
    if (activeTab === 'Products') {
      setFilteredProducts(allProducts);
    } else {
      const newFilteredProducts = allProducts.filter(
        (product) => product.category === activeTab
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [activeTab]);

  // --- Handlers ---
  const handleSeeMore = () => {
    setNewPostCount(prevCount => Math.min(prevCount + 3, allProducts.length));
  };

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="bg-white min-h-screen pb-24 overflow-x-hidden">
      
      <NotificationPanel isOpen={isNotificationsOpen} />

      {/* Header and Search Section */}
      <div className="p-4">
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hi DigiHack</h1>
          </div>
          <button onClick={handleNotificationToggle} className="relative z-20">
            {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
            {notificationCount > 0 && (
              // MODIFIED: Changed translate values from 1/2 to 1/3
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                {notificationCount}
              </span>
            )}
          </button>
        </header>

        <div className="relative">
          <input
            type="text"
            placeholder="Which product do you want to buy?"
            className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-4 pr-10 focus:outline-none"
          />
          <FiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* New Post Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-4">
          <h2 className="text-lg font-bold">New Post</h2>
          {newPostCount < allProducts.length && (
            <button onClick={handleSeeMore} className="text-sm text-green-600 font-semibold">
              see more
            </button>
          )}
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 pl-4">
          {allProducts.slice(0, newPostCount).map(product => (
            <div key={product.id} className="w-36 flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="flex-shrink-0 w-4" aria-hidden="true"></div>
        </div>
      </div>

      {/* Category Tabs Section */}
      <div className="px-4 mb-4">
        <div className="flex border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex-1 min-w-0 text-center py-2 text-sm font-semibold transition truncate ${
                activeTab === category
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Product Grid Section */}
      <div className="px-4 grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar />
    </div>
  );
}

export default CustomerLandingPage;