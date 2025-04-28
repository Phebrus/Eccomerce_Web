import React, { createContext, useContext, useState, ReactNode } from 'react';
import { products, categories } from '../data/products';

interface FilterContextType {
  filteredProducts: typeof products;
  activeCategory: string;
  searchQuery: string;
  sortOption: string;
  priceRange: [number, number];
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortOption: (option: string) => void;
  setPriceRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchQuery("");
    setSortOption("featured");
    setPriceRange([0, 2000]);
  };

  // Get filtered and sorted products
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "newest":
          return (b.new ? 1 : 0) - (a.new ? 1 : 0);
        case "rating":
          return b.rating - a.rating;
        default: // featured
          return 0;
      }
    });

  return (
    <FilterContext.Provider
      value={{
        filteredProducts,
        activeCategory,
        searchQuery,
        sortOption,
        priceRange,
        setActiveCategory,
        setSearchQuery,
        setSortOption,
        setPriceRange,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};