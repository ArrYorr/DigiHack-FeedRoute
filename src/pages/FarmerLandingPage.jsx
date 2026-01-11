import { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

// --- Mock Data ---
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

function FarmerLandingPage() {
  // 1. Get setPageTitle from context
  const { setPageTitle } = useOutletContext();
  
  const [activeTab, setActiveTab] = useState('Products');
  const [filteredProducts, setFilteredProducts] = useState(farmerProducts);
  const [farmerName, setFarmerName] = useState("Farmer");

  // 2. Set the Header Title dynamically
  useEffect(() => {
    const storedName = localStorage.getItem("farmerName") || "Farmer";
    setFarmerName(storedName);
    setPageTitle(`Hi, ${storedName}`); // This updates the top green header
  }, [setPageTitle]);

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
    <div className="bg-white min-h-full flex flex-col">
      {/* Note: NO <header> here anymore. The Layout handles it. */}
      
      <main className="flex-1 p-0">
        {/* Top Horizontal Scroll */}
        <div className="mt-4">
          <div className="flex overflow-x-auto space-x-4 pb-2 px-4">
            {farmerProducts.slice(0, 3).map(product => (
              <div key={product.id} className="w-40 flex-shrink-0">
                <ProductCard product={product} basePath="/farmer-products" />
              </div>
            ))}
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
        <div className="px-4 grid grid-cols-2 md:grid-cols-3 gap-4 pb-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} basePath="/farmer-products" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default FarmerLandingPage;