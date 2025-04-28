import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Calculate discounted price if applicable
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product image with badges */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.new && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">New</span>
          )}
          {product.discount && (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded">
              {product.discount}% Off
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:shadow transition"
        >
          <Heart 
            size={18} 
            className={`${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>

        {/* Quick add to cart button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-2 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-md transition"
          >
            <ShoppingCart size={16} />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base text-gray-800 font-medium line-clamp-1 mb-1 hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-end gap-1">
            <span className="font-semibold text-gray-900">${finalPrice.toFixed(2)}</span>
            {product.discount && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-amber-500">★</span>
            <span className="text-xs sm:text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;