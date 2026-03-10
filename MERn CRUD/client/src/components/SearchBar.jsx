import { Search, X } from "lucide-react";
import React from "react";

function SearchBar() {
  return (
    <div
      className="bg-gray-900 p-4 rounded-lg shadow-lg border
     border-gray-800 flex flex-col md:flex-row items-center
     md:justify-between gap-4"
    >
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
          text-gray-400
          pointer-events-none
        />
        <input
          type="text"
          placeholder="Search by name,email phone or status...."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border
     border-gray-700 text-white placholder-gray-500 rounded-lg
     focus:ring-2 focus:ring-green-500 focus:border-green-500
     outline-none"
        />
        {/*conditional Rendering */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2
     text-gray-400 hover:text-white hover:bg-gray-700 p-1 rounded-full
     transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/*Rows per page and pagination */}
      <div className="flex item-center gap-4">
        <span className="text-sm text-gray-400">
            Showing 1 to 5 of 10 users
        </span>
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Rows</label>
            <select className="px-3 py-1.5 bg-gray-800 border border-gray-700
            text-white rounded-lg focus:ring-2 focus:ring-green-500
            focus:border-green-500 outline-none text-sm">
                <option >5</option>
                <option >10</option>
                <option >15</option>
                <option >20</option>
            </select>
        </div> 
      </div>
    </div>
  );
}

export default SearchBar;
