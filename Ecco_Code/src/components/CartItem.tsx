import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  // Calculate discounted price if applicable
  const itemPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const totalItemPrice = itemPrice * quantity;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200">
      {/* Product image */}
      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Product details */}
      <div className="flex-1 sm:ml-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
            <div className="mt-1 text-sm text-gray-600">
              {selectedColor && <span className="mr-2">Color: {selectedColor}</span>}
              {selectedSize && <span>Size: {selectedSize}</span>}
            </div>
            <div className="mt-1">
              <span className="text-gray-900 font-medium">${itemPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4 sm:mt-0">
            {/* Quantity controls */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={handleDecreaseQuantity}
                className="p-1 text-gray-600 hover:text-gray-900"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-2 py-1 text-gray-800 min-w-[2rem] text-center">{quantity}</span>
              <button 
                onClick={handleIncreaseQuantity}
                className="p-1 text-gray-600 hover:text-gray-900"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Total price */}
            <div className="mx-6 font-medium">
              ${totalItemPrice.toFixed(2)}
            </div>

            {/* Remove button */}
            <button 
              onClick={handleRemove}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;