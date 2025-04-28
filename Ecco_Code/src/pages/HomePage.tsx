import React from 'react';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Featured products
  const featuredProducts = products.slice(0, 8);
  
  // New arrivals
  const newArrivals = products.filter(product => product.new).slice(0, 4);
  
  // On sale products
  const onSaleProducts = products.filter(product => product.discount).slice(0, 4);

  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Featured categories */}
      <FeaturedCategories />

      {/* Featured products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Products</h2>
            <Link 
              to="/products"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New arrivals section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our latest products for your collection.
            </p>
          </div>
          <ProductGrid products={newArrivals} />
          <div className="text-center mt-8">
            <Link
              to="/new-arrivals"
              className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition shadow-sm"
            >
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Special offers */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Special Offers</h2>
              <p className="text-amber-100 text-lg md:max-w-md">
                Shop our discounted products and save big on quality items.
              </p>
              <Link
                to="/sale"
                className="mt-6 inline-block bg-white text-amber-600 py-3 px-6 rounded-md hover:bg-amber-50 transition font-medium"
              >
                View Special Offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:w-1/2">
              {onSaleProducts.map(product => (
<Link
  key={product.id}
  to={`/product/${product.id}`}
  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex items-center transition"
>
  <img 
    src={product.image} 
    alt={product.name}
    className="w-16 h-16 object-cover rounded"
  />
  <div className="ml-3">
    <h3 className="font-medium">{product.name}</h3>
    <div className="flex items-center">
      <span className="font-bold mr-2">
        ${(product.price * (1 - product.discount! / 100)).toFixed(2)}
      </span>
      <span className="line-through text-amber-200 text-sm">
        ${product.price.toFixed(2)}
      </span>
    </div>
  </div>
</Link>

              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Trust section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition-shadow duration-300">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free shipping on all orders over $50. No hidden fees or surprises.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition-shadow duration-300">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
            
            <div className="text-center p-6 hover:shadow-lg rounded-xl transition-shadow duration-300">
              <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">
                Not satisfied with your purchase? Get a full refund within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get updates on new products, special offers, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;