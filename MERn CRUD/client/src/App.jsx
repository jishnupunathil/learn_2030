import React, { useEffect, useState } from "react";

import { Check, Plus, User, Users, X } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserModel from "./components/UserModel";

import {
  getUsers,
  searchUsers,
  getStatus,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userApi";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [status, setStatus] = useState({ total: 0, active: 0, inactive: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  const [editingItem, setEditingItem] = useState(null);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [totalPages, setTotalPages] = useState(0);

  const statusOpt = ["active", "inactive"];

useEffect(() => {
  if (searchTerm) handleSearch();
  else fetchUsers();
}, [searchTerm, currentPage, itemsPerPage]);

  //fetchStats

  const fetchStatus = async () => {
    console.log("🔥 fetchStats called"); // 👈 ADD
    const data = await getStatus();
    console.log("📊 stats data:", data);
    setStatus(data);
  };

  const fetchUsers = async () => {
    console.log("👥 fetchUsers called"); // 👈 ADD
    const data = await getUsers(currentPage, itemsPerPage);
    console.log("🚀 ~ fetchUsers ~ data:", data);
    setUsers(data.users);
    setTotalPages(data.pagination.totalPages); // ✅ FIX
    setTotalUsers(data.pagination.totalUsers);
    fetchStatus();
  };

  const handleSearch = async () => {
    const data = await searchUsers(searchTerm, currentPage, itemsPerPage);
    setUsers(data.users);
    setTotalPages(data.pagination.totalPages); // ✅ FIX
    setTotalUsers(data.pagination.totalUsers);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone)
      return toast.error("Please fill all fields");
    setLoading(true);

    try {
      if (editingItem && editingItem._id) await updateUser(editingItem._id, formData);
      else await addUser(formData);
      fetchUsers();
      closeModel();
    } catch (error) {
  toast.error(error.message || "Something went wrong");
}

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const openModel = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        _id: item._id,
  name: item.name || "",
  email: item.email || "",
  phone: item.phone || "",
  status: item.status || "active",
});
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone: "", status: "active" });
    }
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
    setEditingItem(null);
    setFormData({ name: "", email: "", phone: "", status: "active" });
  };

  return (
    <div className="min-h-screen bg-gray-950">
     <Toaster position="top-right" />
      {/*Header*/}
      <header className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex 
      items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <User size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Managment</h1>
              <p className="text-gray-400">Mern Stack Application</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500
          text-gray-900 px-5 py-2.5 rounded-lg hover:bg-green-400
          transition-colors shadow-lg font-semibold"
            onClick={openModel}
          >
            <Plus size={20} />
            Add User
          </button>
        </div>
      </header>
      {/*Main Content*/}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*Stats Cards*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={{ number: status.totalUsers }}
            icon={<Users />}
            bgIcon="bg-indigo-500"
            iconColor="text-white"
            gradient="from-indigo-900 to-indigo-700"
          />
          <StatsCard
            title="Active Users"
            value={{ number: status.activeUsers }}
            icon={<Check />}
            bgIcon="bg-green-500"
            iconColor="text-white"
            gradient="from-green-900 to-green-700"
          />
          <StatsCard
            title="Inactive Users"
            value={{ number: status.inactiveUsers }}
            icon={<X />}
            bgIcon="bg-indigo-500"
            iconColor="text-white"
            gradient="from-red-900 to-red-700"
          />
        </div>
        {/*search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => {
            setSearchTerm("");
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          currentPage={currentPage}
          totalUsers={totalUsers}
        />
        {/*User Table */}
        <UserTable
          users={users}
          onEdit={openModel}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <UserModel isOpen={isModalOpen} onClose={closeModel} formData={formData}
          setFormData={setFormData} onSubmit={handleSubmit} loading={loading}
          statusOpt={statusOpt}
        />
      </main>
    </div>
  );
}

export default App;
