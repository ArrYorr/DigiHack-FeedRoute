import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { FiMapPin, FiEdit, FiTrash2, FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';
import carrotsImg from '../assets/carrots.jpg';
import onionsImg from '../assets/onions.jpg';
import orangesImg from '../assets/oranges.jpg'; 

const farmerProductsData = {
  '1': {
    id: 1,
    name: 'Tomato',
    poNumber: 'ST456',
    location: 'Jos, Nigeria',
    rating: 4.8,
    price: 8000,
    description: 'Fresh, vine-ripened tomatoes, perfect for stews and salads.',
    benefits: ['Excellent source of Vitamin C.', 'Rich in lycopene.'],
    gallery: [tomatoesImg, tomatoesImg, tomatoesImg],
  },
  '2': {
    id: 2,
    name: 'Maize',
    poNumber: 'ST123',
    location: 'Ikorodu Lagos, Nigeria',
    rating: 4.75,
    price: 7500,
    description: 'Freshly harvested maize, perfect for a variety of local dishes.',
    benefits: ['Rich in fiber.', 'Great source of energy.'],
    gallery: [cornImg, cornImg, cornImg],
  },
  '3': {
    id: 3,
    name: 'Carrot',
    poNumber: 'ST789',
    location: 'Kano, Nigeria',
    rating: 4.6,
    price: 6000,
    description: 'Sweet and crunchy carrots, packed with vitamins.',
    benefits: ['High in Vitamin A.', 'Good for eye health.'],
    gallery: [carrotsImg, carrotsImg, carrotsImg],
  },
  '4': {
    id: 4,
    name: 'Onions',
    poNumber: 'ST012',
    location: 'Zaria, Kaduna',
    rating: 4.85,
    price: 4500,
    description: 'Sharp and flavorful onions for all your cooking needs.',
    benefits: ['Adds flavor to any dish.', 'Contains antioxidants.'],
    gallery: [onionsImg, onionsImg, onionsImg],
  },
  'oranges': {
     id: 'oranges',
     name: 'Oranges', 
     poNumber: 'ST133',
     location: 'Benue, Nigeria',
     rating: 4.75,
     price: 7500,
     description: 'Freshly harvested oranges, sweet and juicy.',
     benefits: ['Rich in Vitamin C.', 'Boosts immunity.'],
     gallery: [orangesImg, orangesImg, orangesImg],
  }
};

function FarmerProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const { setPageTitle } = useOutletContext(); 
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setPageTitle("Product Details");
  }, [setPageTitle]);

  useEffect(() => {
    const data = farmerProductsData[productId];
    if (data) {
      setProduct(data);
    }
    setLoading(false);
  }, [productId]);

  if (loading) return <div className="p-10 text-center text-green-600 font-bold">Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      
      <main className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-8 p-4 pt-6">
        
        {/* Left Column (Images) */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-sm bg-white aspect-square">
            <img 
              src={product.gallery[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white font-bold px-4 py-2 rounded-full text-sm">
              ₦{product.price.toLocaleString()}
            </div>
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
              <FiHeart size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-4 overflow-x-auto pb-2">
            {product.gallery.map((imgSrc, index) => (
              <button 
                key={index} 
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === activeImageIndex ? 'border-green-600 scale-105 opacity-100' : 'border-transparent opacity-60'
                }`}
              >
                <img 
                  src={imgSrc} 
                  alt={`thumbnail-${index}`}
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (Details & Actions) */}
        <div className="px-2 md:px-0 mt-6 md:mt-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">PO No: {product.poNumber}</p>
              <div className="flex items-center text-gray-600 mt-3 text-sm">
                <FiMapPin className="mr-2 text-green-600" />
                <span>{product.location}</span>
              </div>
            </div>
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="ml-1 font-bold text-gray-700">{product.rating}</span>
            </div>
          </div>
          
          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="py-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Key Benefits</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action Buttons - Size Reduced */}
          <div className="mt-8 flex items-center gap-4">
            <button 
              className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-bold py-2.5 text-sm rounded-xl hover:bg-blue-50 transition"
              onClick={() => alert("Edit functionality coming soon!")}
            >
              <FiEdit size={16} /> Edit Product
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 font-bold py-2.5 text-sm rounded-xl hover:bg-red-50 transition"
              onClick={() => alert("Delete functionality coming soon!")}
            >
              <FiTrash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FarmerProductDetailPage;