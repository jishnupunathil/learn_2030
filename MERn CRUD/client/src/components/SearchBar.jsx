import { Search, X } from "lucide-react";
import React from "react";

function SearchBar({
  value,
  onChange,
  onClear,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalUsers,
}) {
  console.log("🚀 ~ SearchBar ~ value:", value)
  const safePage = currentPage || 1;
const safeLimit = itemsPerPage || 5;
const safeTotal = totalUsers || 0;

const startUser = safeTotal === 0 ? 0 : (safePage - 1) * safeLimit + 1;
const endUser = Math.min(safePage * safeLimit, safeTotal);
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
          className="absolute left-3 top-1/2 transform -translate-y-1/2
          text-gray-400
          pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name,email phone or status...."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-800 border
     border-gray-700 text-white placeholder-gray-500 rounded-lg
     focus:ring-2 focus:ring-green-500 focus:border-green-500
     outline-none"
        />
        {/*conditional Rendering */}
        {value && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2
     text-gray-400 hover:text-white hover:bg-gray-700 p-1 rounded-full
     transition-all"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/*Rows per page and pagination */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          Showing {startUser} to {endUser} of {totalUsers} users
        </span>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Rows</label>
          <select
            className="px-3 py-1.5 bg-gray-800 border border-gray-700
            text-white rounded-lg focus:ring-2 focus:ring-green-500
            focus:border-green-500 outline-none text-sm"
            onChange={(e)=>onItemsPerPageChange(Number(e.target.value))}
          >
            <option>{5}</option>
            <option>{10}</option>
            <option>{15}</option>
            <option>{20}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
