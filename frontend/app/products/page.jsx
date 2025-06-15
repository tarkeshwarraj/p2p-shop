'use client'
import React,{useState} from 'react';
import ProductCard from '@/components/ProductCard';
import ProductList from '@/components/ProductList';

const Page = () => {  
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    productId: ''
  });

  const handleSearch = () =>{
    //just triggers useEffect in ProductList via prop update
    setFilters({ ...filters });
  }

  return (
    <div>
      {/* Search + Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 p-6 bg-white shadow-lg border border-gray-200 rounded-lg">
        {/* Search Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end w-full">
          {/* Product Name Input */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="product" className="text-sm text-gray-600 mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="product"
              placeholder="Enter product name"
              className="border border-gray-300 px-4 py-2.5 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.name}
              onChange={(e) => setFilters({...filters, name: e.target.value})}
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col w-full sm:w-1/4">
            <label htmlFor="category" className="text-sm text-gray-600 mb-1 font-medium">
              Category
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value})}
              name="category"
              className="border border-gray-300 px-4 py-2.5 rounded-md text-base bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Leads">Leads</option>
              <option value="Accounts">Accounts</option>
              <option value="Guns">Guns</option>
              <option value="Drugs">Drugs</option>
            </select>
          </div>

          {/* Product ID Input */}
          <div className="flex flex-col w-full sm:w-1/3">
            <label htmlFor="productId" className="text-sm text-gray-600 mb-1 font-medium">
              Product ID
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
              <div className="px-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15.75 15.75-3.262-3.262M14.25 8.25a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
                    stroke="#6B7280"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by Product ID"
                value={filters.productId}
                onChange={(e) => setFilters({ ...filters, productId: e.target.value})}
                className="w-full px-3 py-2.5 text-base text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="w-full sm:w-auto">
          <button onClick={handleSearch} className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-md text-base font-semibold transition-all shadow-lg w-full sm:w-auto mt-4 sm:mt-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z"
              />
            </svg>
            Search
          </button>
        </div>
      </div>

      {/* Product List Section */}
      <div className="p-6 flex justify-center">
        <ProductList filters={filters}/>
        
      </div>
    </div>
  );
};

export default Page;
