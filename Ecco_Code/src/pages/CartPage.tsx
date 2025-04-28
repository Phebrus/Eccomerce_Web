import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const CartPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Suggested products (random selection)
  const suggestedProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart</h1>
        <Link 
          to="/products" 
          className="flex items-center text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/products"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h2 className="text-xl font-medium text-gray-800">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</h2>
              </div>
              
              {cart.map((item, index) => (
                <CartItem key={`${item.product.id}-${index}`} item={item} />
              ))}
              
              <div className="flex justify-between mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => clearCart()}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-medium text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium text-gray-900">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* You might also like */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
        <ProductGrid products={suggestedProducts} />
      </div>
    </div>
  );
};

export default CartPage;