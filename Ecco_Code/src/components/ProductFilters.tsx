import React, { useState } from 'react';
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { useFilter } from '../context/FilterContext';
import { categories } from '../data/products';

const ProductFilters: React.FC = () => {
  const { 
    activeCategory, 
    setActiveCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    resetFilters
  } = useFilter();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    categories: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Mobile filter toggle */}
      <div className="lg:hidden p-4 border-b">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-between py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          <div className="flex items-center">
            <Sliders size={18} className="mr-2" />
            <span>Filters</span>
          </div>
          {isMobileFiltersOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Filters content - hidden on mobile unless expanded */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block p-4`}>
        {/* Sort options - visible on all screens */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-3">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="featured">Featured</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Categories section */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection('categories')}
          >
            <h3 className="font-medium text-gray-800">Categories</h3>
            {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedSections.categories && (
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <button
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left py-1 px-2 rounded-md text-sm transition ${
                      activeCategory === category 
                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price range section */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => toggleSection('price')}
          >
            <h3 className="font-medium text-gray-800">Price Range</h3>
            {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
          
          {expandedSections.price && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">${priceRange[0]}</span>
                <span className="text-gray-600 text-sm">${priceRange[1]}</span>
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  min={0}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                  className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  min={priceRange[0]}
                  max={2000}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                  className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Reset filters button */}
        <button
          onClick={resetFilters}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;