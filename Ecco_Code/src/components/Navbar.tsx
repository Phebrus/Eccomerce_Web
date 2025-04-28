import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-indigo-700 shrink-0">LUXEMART</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition whitespace-nowrap">Home</Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 transition py-4 whitespace-nowrap">
                Categories
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 -mt-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${category}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition whitespace-nowrap">Shop All</Link>
          </div>
          
          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-6 shrink-0">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600 transition">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-indigo-600 transition">
              <User size={20} />
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-700 mr-4 relative">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar (Desktop) */}
        {searchOpen && (
          <div className="hidden md:block py-3 border-t border-gray-100">
            <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-4">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition"
              >
                <Search size={18} />
              </button>
            </form>
            
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <div className="py-2">
                <p className="font-medium text-gray-700 mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(1).map((category) => (
                    <Link
                      key={category}
                      to={`/products?category=${category}`}
                      className="text-sm text-gray-600 hover:text-indigo-600 transition py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                to="/wishlist" 
                className="text-gray-700 hover:text-indigo-600 transition py-2 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={18} className="mr-2" /> Wishlist
              </Link>
              <Link 
                to="/account" 
                className="text-gray-700 hover:text-indigo-600 transition py-2 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} className="mr-2" /> Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;