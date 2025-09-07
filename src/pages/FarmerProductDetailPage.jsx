import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiHeart, FiMapPin, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';
import carrotsImg from '../assets/carrots.jpg';
import onionsImg from '../assets/onions.jpg';
import orangesImg from '../assets/oranges.jpg'; // The image from the screenshot

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
    gallery: [tomatoesImg, cornImg, carrotsImg],
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
    gallery: [cornImg, tomatoesImg, carrotsImg],
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
    gallery: [carrotsImg, tomatoesImg, cornImg],
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
    gallery: [onionsImg, tomatoesImg, cornImg],
  },
  // This is the data from the screenshot you sent
  'oranges': {
     id: 'oranges', // A unique ID
     name: 'Maize', // The screenshot text says "Maize"
     poNumber: 'ST133',
     location: 'Ikorodu Lagos, Nigeria',
     rating: 4.75,
     price: 7500,
     description: 'Freshly harvested oranges (labeled as Maize in screenshot).',
     benefits: ['Rich in Vitamin C.'],
     gallery: [orangesImg, orangesImg, orangesImg],
  }
};
// --- End Mock Data ---


function FarmerProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isNotificationsOpen, handleNotificationToggle, notificationCount } = useOutletContext();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const data = farmerProductsData[productId];
    if (data) {
      setProduct(data);
    }
    setLoading(false);
  }, [productId]);

  // ... (Slider effect and handlers remain the same)

  if (loading) return <div>Loading...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Error: Product not found for ID '{productId}'.</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <header className="flex justify-between items-center p-4">
        <button onClick={() => navigate(-1)} className="text-gray-600"><IoIosArrowBack size={24} /></button>
        <h1 className="font-bold text-lg">Product Details</h1>
        <button onClick={handleNotificationToggle} className="relative z-20">
          {isNotificationsOpen ? <FiX size={24} className="text-gray-600" /> : <FiBell size={24} className="text-gray-600" />}
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
              {notificationCount}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-8">
        {/* Left Column (Images) */}
        <div>
          <div className="relative">
            <img src={product.gallery[activeImageIndex]} alt={product.name} className="w-full h-80 object-cover rounded-lg" />
            <div className="absolute top-4 left-4 bg-black/50 text-white font-bold px-4 py-2 rounded-full">
              ₦{product.price.toLocaleString()}
            </div>
            <div className="absolute top-4 right-4 bg-white/50 p-2 rounded-full">
              <FiHeart size={24} className="text-white" />
            </div>
          </div>
          <div className="flex justify-center space-x-2 p-4">
            {product.gallery.map((imgSrc, index) => (
              <button key={index} onClick={() => setActiveImageIndex(index)}>
                <img 
                  src={imgSrc} 
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg border-2 transition ${
                    index === activeImageIndex ? 'border-green-500' : 'border-transparent opacity-70'
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column (Details & Actions) */}
        <div className="px-4 md:px-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">PO No: {product.poNumber}</p>
              <div className="flex items-center text-gray-600 mt-2">
                <FiMapPin className="mr-2" />
                <span>{product.location}</span>
              </div>
            </div>
            <div className="flex items-center text-yellow-500 mt-1">
              <FaStar />
              <span className="ml-1 font-bold text-gray-700">{product.rating}</span>
            </div>
          </div>
          
          <div className="py-4 border-b mt-4">
            <h3 className="font-bold mb-1">Description</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          <div className="py-4 border-b">
            <h3 className="font-bold mb-2">Benefits</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
              {product.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
            </ul>
          </div>
          
          <div className="mt-6 flex items-center space-x-4">
            <button className="flex-1 flex items-center justify-center border-2 border-blue-500 text-blue-500 font-bold py-3 rounded-full hover:bg-blue-50 transition">
              <FiEdit className="mr-2" /> Edit
            </button>
            <button className="flex-1 flex items-center justify-center border-2 border-red-500 text-red-500 font-bold py-3 rounded-full hover:bg-red-50 transition">
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FarmerProductDetailPage;