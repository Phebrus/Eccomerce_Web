import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist</h1>
        <Link 
          to="/products" 
          className="text-gray-600 hover:text-indigo-600 transition"
        >
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Heart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love for later by clicking the heart icon.</p>
          <Link 
            to="/products"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
            <button
              onClick={() => wishlist.forEach(item => removeFromWishlist(item.id))}
              className="text-gray-600 hover:text-red-600 transition"
            >
              Clear Wishlist
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;