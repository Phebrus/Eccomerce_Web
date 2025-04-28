import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ProductFilters from '../components/ProductFilters';
import { useFilter } from '../context/FilterContext';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const { 
    filteredProducts, 
    setActiveCategory, 
    setSearchQuery,
    activeCategory
  } = useFilter();

  useEffect(() => {
    // Parse query parameters
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const searchParam = queryParams.get('search');
    
    // Apply filters based on URL parameters
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search, setActiveCategory, setSearchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {activeCategory === 'All' ? 'All Products' : activeCategory}
        </h1>
        <p className="text-gray-600 mb-8">
          {filteredProducts.length} products available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <div className="md:col-span-1">
          <ProductFilters />
        </div>

        {/* Product grid */}
        <div className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;