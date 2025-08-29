import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoIosArrowBack } from 'react-icons/io';
import { FiBell, FiHeart, FiMapPin, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';

const productsData = {
  '1': {
    id: 1,
    name: 'Maize',
    poNumber: 'ST123',
    location: 'Ikorodu Lagos, Nigeria',
    rating: 4.75,
    price: 7500,
    description: 'Freshly harvested maize, perfect for a variety of local dishes. Grown with organic farming practices to ensure the best quality and taste.',
    benefits: [
      'Rich in fiber and antioxidants.',
      'A great source of natural energy.',
      'Supports a healthy digestive system.',
    ],
    gallery: [cornImg, tomatoesImg, cornImg, tomatoesImg, cornImg],
    relatedProducts: [
      { id: 1, name: 'Maize', price: 100, imageUrl: cornImg },
      { id: 2, name: 'Tomatoes', price: 180, imageUrl: tomatoesImg },
    ],
  },
  '2': {
    id: 2,
    name: 'Tomatoes',
    poNumber: 'ST456',
    location: 'Jos, Nigeria',
    rating: 4.9,
    price: 5000,
    description: 'Vine-ripened tomatoes, bursting with flavor.',
    benefits: ['Excellent source of Vitamin C.', 'Rich in lycopene.'],
    gallery: [tomatoesImg, cornImg, tomatoesImg],
    relatedProducts: [
      { id: 1, name: 'Maize', price: 100, imageUrl: cornImg },
    ],
  },
};
// --- End Mock Data ---


function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isNotificationsOpen, handleNotificationToggle } = useOutletContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // --- Simplified Data Fetching Effect for Debugging ---
  useEffect(() => {
    console.log("Attempting to find product with ID from URL:", productId);
    const data = productsData[productId];

    if (data) {
      console.log("Product found:", data);
      setProduct(data);
    } else {
      console.error("Error: Product not found for ID:", productId);
      setError('Product not found. Please check your mock data.');
    }

    setLoading(false); // Set loading to false directly
  }, [productId]);

  // --- Automatic Slider Effect ---
  useEffect(() => {
    if (product?.gallery?.length > 1) {
      const interval = setInterval(() => {
        setActiveImageIndex(prevIndex => (prevIndex + 1) % product.gallery.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [product]);

  // --- Handlers ---
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleLike = () => setIsLiked(!isLiked);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleOrder = () => navigate('/checkout');

  // --- Render States ---
  if (loading) return <div className="text-center p-10">Loading product...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white min-h-screen">
      <header className="flex justify-between items-center p-4 max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-gray-600"><IoIosArrowBack size={24} /></button>
        <h1 className="font-bold text-lg">Product Details</h1>
        <button onClick={handleNotificationToggle} className="relative text-gray-600 z-20">
          {isNotificationsOpen ? <FiX size={24} /> : <FiBell size={24} />}
        </button>
      </header>

      <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 md:gap-8">
        <div className="md:sticky md:top-24 h-fit">
          <div className="relative">
            <img src={product.gallery[activeImageIndex]} alt={product.name} className="w-full h-80 object-cover rounded-lg" />
            <div className="absolute top-4 left-4 bg-black/50 text-white font-bold px-4 py-2 rounded-full">
              ₦{product.price.toLocaleString()}
            </div>
            <button onClick={handleLike} className="absolute top-4 right-4 bg-white/50 p-2 rounded-full">
              <FiHeart size={24} className="transition" style={{ fill: isLiked ? '#ef4444' : 'none', stroke: isLiked ? '#ef4444' : 'white' }} />
            </button>
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

        <div className="px-4 pb-24 md:px-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.poNumber}</p>
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
          
          <div className="py-4 flex items-center justify-between border-b">
            <div className="flex items-center">
              <img src={product.gallery[activeImageIndex]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="ml-4">
                <p className="font-bold">{product.name}</p>
                <p className="text-sm text-gray-500">₦ {product.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={decrementQuantity} className="bg-gray-200 p-2 rounded-full"><FiMinus /></button>
              <span className="font-bold text-lg w-8 text-center">{quantity}</span>
              <button onClick={incrementQuantity} className="bg-green-600 text-white p-2 rounded-full"><FiPlus /></button>
            </div>
          </div>
          
          <div className="mt-6 flex items-center space-x-4">
            <button onClick={handleAddToCart} className="flex-1 border-2 border-green-600 text-green-600 font-bold py-3 rounded-full hover:bg-green-50 transition">
              Add to cart
            </button>
            <button onClick={handleOrder} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700 transition">
              Order
            </button>
          </div>

          <div className="mt-8">
            <h3 className="font-bold mb-2">Related Product</h3>
            <div className="flex overflow-x-auto space-x-4 pb-2">
              <div className="flex-shrink-0 w-4" aria-hidden="true"></div>
                {product.relatedProducts.map(related => (
                  <div key={related.id} className="w-36 flex-shrink-0">
                    <ProductCard product={related} />
                  </div>
                ))}
              <div className="flex-shrink-0 w-4" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;