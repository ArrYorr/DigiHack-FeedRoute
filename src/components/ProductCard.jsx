import { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // 1. Import Link

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    // Prevent the Link from firing when the like button is clicked
    e.preventDefault(); 
    setIsLiked(!isLiked);
  };

  return (
    // 2. Wrap the entire card in a Link component
    <Link to={`/products/${product.id}`} className="block">
      <div className="relative overflow-hidden rounded-md shadow-md">
        
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-32 object-cover" 
        />
        
        <button 
          onClick={handleLikeClick}
          className="absolute top-2 right-2 bg-black/20 p-1.5 rounded-full"
        >
          <FiHeart 
            className="text-white"
            style={{ fill: isLiked ? 'red' : 'none', stroke: isLiked ? 'red' : 'white' }}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-sm font-bold text-white truncate">{product.name}</h3>
          <p className="text-xs text-white font-semibold">₦{product.price}</p>
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;