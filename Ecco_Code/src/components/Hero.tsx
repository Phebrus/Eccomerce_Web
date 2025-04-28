import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-400"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-600"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-16 lg:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Elevate Your Lifestyle with Premium Products
            </h1>
            <p className="text-indigo-100 text-base md:text-lg lg:text-xl mb-6 md:mb-8">
              Discover our curated collection of high-quality products designed to enhance your everyday experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/products"
                className="bg-white text-indigo-700 hover:bg-indigo-50 font-medium px-6 py-3 rounded-md transition shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Shop Now
                <ArrowRight size={18} className="ml-2 animate-pulse" />
              </Link>
              <Link 
                to="/new-arrivals"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md transition flex items-center justify-center"
              >
                New Arrivals
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-indigo-400/20 rounded-xl"></div>
            <img 
              src="https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Premium products showcase" 
              className="rounded-xl shadow-2xl relative z-10 object-cover h-[500px] w-full"
            />
            <div className="absolute -top-2 -right-2 bg-amber-400 text-indigo-900 font-bold py-2 px-4 rounded-lg shadow-lg transform rotate-6">
              NEW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;