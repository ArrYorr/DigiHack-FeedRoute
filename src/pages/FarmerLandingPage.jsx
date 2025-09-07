import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FiBell, FiUpload, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import FarmerBottomNavBar from '../components/FarmerBottomNavBar';

// --- Mock Data for the Farmer's Products ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';
import carrotsImg from '../assets/carrots.jpg';
import onionsImg from '../assets/onions.jpg';

const farmerProducts = [
  { id: 1, name: 'Tomato', price: 180, imageUrl: tomatoesImg, category: 'Vegetables' },
  { id: 2, name: 'Maize', price: 180, imageUrl: cornImg, category: 'Products' },
  { id: 3, name: 'Carrot', price: 180, imageUrl: carrotsImg, category: 'Tubers' },
  { id: 4, name: 'Onions', price: 180, imageUrl: onionsImg, category: 'Vegetables' },
];

const categories = ['Products', 'Fruits', 'Legumes', 'Tubers', 'Vegetables'];
// --- End of Mock Data ---


function FarmerLandingPage() {
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();
  const [activeTab, setActiveTab] = useState('Products');
  const [filteredProducts, setFilteredProducts] = useState(farmerProducts);

  useEffect(() => {
    if (activeTab === 'Products') {
      setFilteredProducts(farmerProducts);
    } else {
      const newFilteredProducts = farmerProducts.filter(
        (product) => product.category === activeTab
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [activeTab]);


  return (
    <div className="bg-white h-full flex flex-col">
      <header className="sticky top-0 bg-white z-10 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Hi DigiHack</h1>
          <button onClick={handleNotificationToggle} className="relative z-20">
            {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
        {/* Top Horizontal Scroll */}
        <div className="mt-4">
          <div className="flex overflow-x-auto space-x-4 pb-2">
            <div className="flex-shrink-0 w-4"></div>
            {farmerProducts.slice(0, 3).map(product => (
              <div key={product.id} className="w-40 flex-shrink-0">
                {/* MODIFIED: Pass the correct basePath to the card */}
                <ProductCard product={product} basePath="/farmer-products" />
              </div>
            ))}
            <div className="flex-shrink-0 w-4"></div>
          </div>
        </div>

        {/* See More and Upload Section */}
        <div className="flex justify-between items-center px-4 my-4">
          <a href="#" className="text-sm text-gray-500">see more</a>
          <Link to="/farmer-products" className="flex items-center bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-full">
            <FiUpload className="mr-2" size={16} />
            Upload
          </Link>
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
        
        {/* Farmer's Product Grid */}
        <div className="px-4 grid grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            // MODIFIED: Pass the correct basePath to the card here too
            <ProductCard key={product.id} product={product} basePath="/farmer-products" />
          ))}
        </div>
      </main>

      <FarmerBottomNavBar />
    </div>
  );
}

export default FarmerLandingPage;