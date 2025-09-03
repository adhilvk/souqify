import React from "react";
import { Download, Search, Trash2 } from "lucide-react";

export default function TableActions() {
  return (
    <div className="flex justify-between items-center gap-6 p-6 
      bg-white rounded-xl shadow-sm border border-gray-200 
      dark:bg-slate-700 dark:border-none">
      
      {/* Export Button */}
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
        text-gray-700 bg-gray-100 border border-gray-300 rounded-lg 
        hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-500 
        dark:bg-slate-800 dark:text-white dark:border-lime-500 
        dark:hover:text-white">
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>

      {/* Search Input */}
      <div className="flex-grow max-w-md">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search"
            placeholder="Search for items"
            className="block w-full pl-10 pr-4 py-2 text-sm 
              text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
              focus:ring-lime-500 focus:border-lime-500 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
          />
        </div>
      </div>

      {/* Bulk Delete Button */}
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
        text-white bg-red-600 rounded-lg hover:bg-red-700 
        focus:outline-none focus:ring-2 focus:ring-red-400">
        <Trash2 className="w-4 h-4" />
        <span>Bulk Delete</span>
      </button>
    </div>
  );
}
