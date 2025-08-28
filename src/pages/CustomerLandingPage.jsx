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
  const [activeTab, setActiveTab] = useState('Products');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [newPostCount, setNewPostCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    // ... (filtering logic remains the same)
  }, [activeTab]);

  const handleSeeMore = () => {
    // ... (see more logic remains the same)
  };

  const handleNotificationToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="relative bg-white h-screen flex flex-col">
      
      <NotificationPanel isOpen={isNotificationsOpen} />

      <header className="sticky top-0 bg-white z-10 shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hi DigiHack</h1>
          </div>
          <button onClick={handleNotificationToggle} className="relative z-20">
            {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Which product do you want to buy?"
            className="w-full bg-gray-100 border border-gray-200 rounded-full py-3 pl-4 pr-10 focus:outline-none"
          />
          <FiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
        {/* New Post Section */}
        <div className="mb-6 mt-4">
          <div className="flex justify-between items-center mb-2 px-4">
            <h2 className="text-lg font-bold">New Post</h2>
            {newPostCount < allProducts.length && (
              <button onClick={handleSeeMore} className="text-sm text-green-600 font-semibold">
                see more
              </button>
            )}
          </div>
          {/* MODIFIED: Replaced padding with invisible spacer divs for a more stable layout */}
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {/* Spacer for left padding */}
            <div className="flex-shrink-0 w-4" aria-hidden="true"></div>
            {allProducts.slice(0, newPostCount).map(product => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
            {/* Spacer for right padding */}
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
      </main>

      <BottomNavBar />
    </div>
  );
}

export default CustomerLandingPage;