import React from "react";

import { Plus, User } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";

import {
  getUsers,
  searchUsers,
  getStats,
  addUser,
  updateUser,
  deleteUser
} from './api/userApi'

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/*Header*/}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex 
      items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <User size={28} className="text-gray-900"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Managment</h1>
              <p className="text-gray-400">Mern Stack Application</p>
            </div>
          </div>
          <button className="flex item-center gap-2 bg-green-500
          text-gray-900 px-5 py-2.5 rounded-lg hover:bg-green-400
          transition-colors shadow-lg font-semibold">
            <Plus size={20} />
            Add User  
          </button>
        </div>
      </header>
      {/*Main Content*/}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/*Stats Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard  />
        </div>
{/*search */}
<SearchBar />
{/*User Table */}
<UserTable />
{/* <UserModel /> */}

      </main>
    </div>
  );
}

export default App;
