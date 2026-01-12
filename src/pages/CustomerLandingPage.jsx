import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FiBell, FiSearch, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';
import carrotsImg from '../assets/carrots.jpg';
import berriesImg from '../assets/berries.jpg';

const allProducts = [
  { id: 1, name: 'Maize', price: 7500, imageUrl: cornImg, category: 'Products' },
  { id: 2, name: 'Tomatoes', price: 5000, imageUrl: tomatoesImg, category: 'Vegetables' },
  { id: 3, name: 'Carrots', price: 2500, imageUrl: carrotsImg, category: 'Tubers' },
  { id: 4, name: 'Berries', price: 2000, imageUrl: berriesImg, category: 'Fruits' },
  { id: 5, name: 'Extra Maize', price: 1100, imageUrl: cornImg, category: 'Products' },
  { id: 6, name: 'More Berries', price: 1500, imageUrl: berriesImg, category: 'Fruits' },
];

const categories = ['Products', 'Fruits', 'Legumes', 'Tubers', 'Vegetables'];

function CustomerLandingPage() {
  const [activeTab, setActiveTab] = useState('Products');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [newPostCount, setNewPostCount] = useState(3);
  const [customerName, setCustomerName] = useState("Customer");

  // Get context from MainLayout
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();

  useEffect(() => {
    const storedName = localStorage.getItem("customerName");
    if (storedName) setCustomerName(storedName);
  }, []);

  useEffect(() => {
    if (activeTab === 'Products') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === activeTab));
    }
  }, [activeTab]);

  const handleSeeMore = () => {
    setNewPostCount(prev => Math.min(prev + 3, allProducts.length));
  };

  return (
    <div className="bg-white h-full flex flex-col">
      
      {/* --- UPDATED HEADER SECTION (GREEN) --- */}
      <header className="sticky top-0 bg-green-700 z-10 shadow-md p-4 pb-6 rounded-b-2xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">Hi, {customerName}</h1>
            <p className="text-green-100 text-xs">What do you want to buy today?</p>
          </div>
          <button onClick={handleNotificationToggle} className="relative z-20">
            {isNotificationsOpen ? (
              <FiX size={24} className="text-white" />
            ) : (
              <FiBell size={24} className="text-white" />
            )}
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-red-600 font-bold text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar - styled to pop against the green */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for maize, yam..."
            className="w-full bg-white text-gray-800 border-none rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm placeholder-gray-400"
          />
          <FiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
        </div>
      </header>
      {/* ------------------------------------- */}

      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24 pt-4">
        {/* New Post Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 px-4">
            <h2 className="text-lg font-bold text-gray-800">New Post</h2>
            {newPostCount < allProducts.length && (
              <button onClick={handleSeeMore} className="text-sm text-green-600 font-semibold">
                see more
              </button>
            )}
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-2 px-4">
            {allProducts.slice(0, newPostCount).map(product => (
              <div key={product.id} className="w-36 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
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
        
        {/* Product Grid */}
        <div className="px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CustomerLandingPage;