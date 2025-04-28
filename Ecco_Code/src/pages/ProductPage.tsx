import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, RotateCw, ShieldCheck, Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const product = products.find(p => p.id === productId);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [activeTab, setActiveTab] = useState('description');
  const [isInWish, setIsInWish] = useState(false);

  useEffect(() => {
    if (product) {
      setIsInWish(isInWishlist(product.id));
      setSelectedColor(product.colors?.[0]);
      setSelectedSize(product.sizes?.[0]);
    }
  }, [product, isInWishlist]);

  // Get related products (same category, excluding current product)
  const relatedProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link 
          to="/products"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate discounted price
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleWishlistToggle = () => {
    if (isInWish) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setIsInWish(!isInWish);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/products" 
          className="flex items-center text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Products
        </Link>
      </div>

      {/* Product details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product images */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < Math.floor(product.rating) 
                    ? "fill-amber-400 text-amber-400" 
                    : "fill-gray-200 text-gray-200"
                  } 
                />
              ))}
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-end mb-2">
              <span className="text-3xl font-bold text-gray-900 mr-3">${finalPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="ml-3 bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded">
                  Save {product.discount}%
                </span>
              )}
            </div>
            <p className="text-green-600">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          </div>
          
          <div className="border-t border-gray-200 py-6">
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`p-0.5 rounded-full ${selectedColor === color ? 'ring-2 ring-indigo-500' : ''}`}
                    >
                      <span 
                        className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center"
                        style={{ backgroundColor: color.toLowerCase() === 'silver' ? '#C0C0C0' : 
                                               color.toLowerCase() === 'gold' ? '#FFD700' :
                                               color.toLowerCase() === 'space gray' ? '#8C8C8C' :
                                               color.toLowerCase() === 'midnight blue' ? '#191970' : 
                                               color.toLowerCase() === 'tortoise shell' ? '#704423' : 
                                               color.toLowerCase() }}
                      >
                        {color.toLowerCase() === 'silver' || color.toLowerCase() === 'gold' || color.toLowerCase() === 'white' ? (
                          <span className="text-xs text-gray-800 font-medium">{color.substring(0, 1)}</span>
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1 px-3 border ${
                        selectedSize === size 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      } rounded-md text-sm font-medium transition`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and add to cart */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex">
                <div className="flex items-center border border-gray-300 rounded-md mr-4">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-gray-800">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md transition flex items-center justify-center"
                disabled={!product.inStock}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`flex items-center justify-center py-3 px-6 rounded-md border transition ${
                  isInWish 
                    ? 'bg-red-50 border-red-300 text-red-600' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart 
                  size={18} 
                  className={`mr-2 ${isInWish ? 'fill-red-500 text-red-500' : ''}`} 
                />
                {isInWish ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
            
            {/* Shipping and returns */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Truck size={18} className="mr-2 text-gray-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RotateCw size={18} className="mr-2 text-gray-500" />
                <span>Free 30-day returns</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck size={18} className="mr-2 text-gray-500" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'description' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'features' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 text-sm font-medium border-b-2 ${
                activeTab === 'reviews' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel enim at eros feugiat blandit. 
                Phasellus rhoncus velit eget sapien feugiat dignissim. Etiam sed diam vel dolor cursus volutpat. 
                Aliquam erat volutpat. Fusce vel efficitur nunc, sit amet finibus enim.
              </p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-3 list-disc pl-5 text-gray-700">
                {product.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      className={i < Math.floor(product.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "fill-gray-200 text-gray-200"
                      } 
                    />
                  ))}
                </div>
                <span className="ml-3 text-gray-900 text-lg font-medium">{product.rating} out of 5</span>
              </div>
              
              <div className="border-t border-gray-200 py-6">
                <p className="text-gray-600 mb-4">Customer reviews are coming soon!</p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;