import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function ProductCard({ product }) {
  // 1. Add state to track if the item is liked
  const [isLiked, setIsLiked] = useState(false);

  // 2. Create a function to handle the click event
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // This toggles the state between true and false
  };

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="w-full h-32 object-cover" 
      />
      
      {/* 3. Make the icon a button and add the onClick handler */}
      <button 
        onClick={handleLikeClick}
        className="absolute top-2 right-2 bg-white/60 p-2 rounded-full focus:outline-none"
      >
        {/* 4. Conditionally show a filled or outline heart */}
        {isLiked ? (
          <FaHeart className="text-red-500" /> // Liked state
        ) : (
          <FaRegHeart className="text-gray-800" /> // Default state
        )}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-sm font-bold text-white truncate">{product.name}</h3>
        <p className="text-xs text-white font-semibold">₦{product.price}</p>
      </div>

    </div>
  );
}

export default ProductCard;