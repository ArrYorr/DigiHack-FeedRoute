import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiHeart, FiMapPin, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

// --- Mock Data ---
import cornImg from '../assets/corn.jpg';
import tomatoesImg from '../assets/tomatoes.jpg';

const productsData = {
  '1': {
    id: 1,
    name: 'Fresh Maize',
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
    gallery: [cornImg, cornImg, cornImg, cornImg], 
    relatedProducts: [
      { id: 2, name: 'Tomatoes', price: 5000, imageUrl: tomatoesImg, category: 'Vegetables' },
    ],
  },
  '2': {
    id: 2,
    name: 'Red Tomatoes',
    poNumber: 'ST456',
    location: 'Jos, Nigeria',
    rating: 4.9,
    price: 5000,
    description: 'Vine-ripened tomatoes, bursting with flavor and perfect for stews.',
    benefits: ['Excellent source of Vitamin C.', 'Rich in lycopene.'],
    gallery: [tomatoesImg, tomatoesImg, tomatoesImg], 
    relatedProducts: [
      { id: 1, name: 'Maize', price: 7500, imageUrl: cornImg, category: 'Products' },
    ],
  },
};

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // 1. Get the title setter from the Global Layout
  // We removed notification props because the Global Header handles that now
  const { setCurrentPageTitle } = useOutletContext(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // 2. Set the Global Header Title on Mount
  useEffect(() => {
    setCurrentPageTitle("Details"); 
  }, [setCurrentPageTitle]);

  useEffect(() => {
    const data = productsData[productId];
    if (data) {
      setProduct(data);
    } else {
      setError('Product not found.');
    }
    setLoading(false);
  }, [productId]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
    }
  };

  const handleOrder = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-green-600">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-32 md:pb-0">
      
      {/* ❌ HEADER REMOVED: It is now handled by MainLayout.jsx */}

      <div className="max-w-6xl mx-auto md:p-8 pt-4"> {/* Added pt-4 for top spacing */}
        <div className="bg-white md:rounded-3xl md:shadow-lg overflow-hidden md:flex">
          
          {/* --- LEFT: Image Gallery --- */}
          <div className="md:w-1/2 p-4 md:p-8 bg-gray-50">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={product.gallery[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:scale-110 transition"
              >
                <FiHeart 
                  size={24} 
                  className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} 
                />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-green-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: Details --- */}
          <div className="md:w-1/2 p-6 md:p-10 flex flex-col">
            
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Available
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h2>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-green-700">₦{product.price.toLocaleString()}</span>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-bold text-gray-800 mr-1">{product.rating}</span>
                  <span>(120 reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-6">
              <FiMapPin className="mr-1 text-green-600" />
              {product.location}
            </div>

            <div className="prose prose-sm text-gray-600 mb-6">
              <h3 className="text-gray-900 font-bold text-lg mb-2">Description</h3>
              <p className="leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-gray-900 font-bold text-lg mb-2">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-600">
                    <span className="mr-2 mt-1 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Actions (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-4 mt-auto pt-6 border-t">
               <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <button onClick={decrementQuantity} className="p-2 hover:text-green-600"><FiMinus /></button>
                <span className="mx-4 font-bold text-lg w-6 text-center">{quantity}</span>
                <button onClick={incrementQuantity} className="p-2 hover:text-green-600"><FiPlus /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2">
                <FiShoppingCart /> Add to Cart
              </button>
              <button onClick={handleOrder} className="flex-1 bg-green-600 text-white font-bold py-4 rounded-full hover:bg-green-700 transition shadow-lg shadow-green-200">
                Buy Now
              </button>
            </div>

          </div>
        </div>

        {/* --- Related Products --- */}
        <div className="mt-12 px-4 md:px-0">
          <h3 className="text-xl font-bold text-gray-900 mb-6">You might also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.relatedProducts.map(related => (
               <div key={related.id} className="w-full">
                 <ProductCard product={related} />
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Mobile Fixed Bottom Action Bar --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40 md:hidden pb-safe">
        <div className="flex gap-3">
          <div className="flex items-center bg-gray-100 rounded-xl px-2">
            <button onClick={decrementQuantity} className="p-3 text-gray-600"><FiMinus /></button>
            <span className="font-bold text-lg w-4 text-center">{quantity}</span>
            <button onClick={incrementQuantity} className="p-3 text-gray-600"><FiPlus /></button>
          </div>
          <button onClick={handleAddToCart} className="flex-1 bg-gray-900 text-white font-bold rounded-xl py-3 text-sm">
            Add to Cart
          </button>
          <button onClick={handleOrder} className="flex-1 bg-green-600 text-white font-bold rounded-xl py-3 text-sm shadow-lg shadow-green-100">
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetailPage;