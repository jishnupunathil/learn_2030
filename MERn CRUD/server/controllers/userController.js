const mongoose = require("mongoose");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//get Status
const getStatus = asyncHandler(async (req, res) => {
  console.log("🚀 ~ req:", req);

  const statusCounts = await User.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalUsers = statusCounts.reduce((acc, curr) => acc + curr.count, 0);
  const activeUsers = statusCounts.find((s) => s._id === "active")?.count || 0;

  const inactiveUsers =
    statusCounts.find((s) => s._id === "inactive")?.count || 0;

  res.json({
    totalUsers,
    activeUsers,
    inactiveUsers,
  });
});

const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchFields = ["name", "email", "status", "phone"];

  const searchQuery = query
    ? {
        $or: searchFields.map((field) => ({
          [field]: { $regex: query, $options: "i" },
        })),
      }
    : {};

  const users = await User.find(searchQuery)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalUsers = await User.countDocuments(searchQuery);

  res.json({
    users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    },
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);
});

const allUsers = asyncHandler(async (req, res) => {
console.log("🚀 ~ req:1111111111111111", )

  
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (page - 1) * limit;

  const users = await User.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  console.log("🚀 ~ users:", users)

  const totalUsers = await User.countDocuments();

  res.json({
    users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit) || 1,
      totalUsers,
    },
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, phone, status } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = new User({
    name,
    email,
    phone,
    status: status || "active",
  });
  await user.save();

  res.status(201).json({ message: "User created successfully", user });
});


const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  if(email){
    const existingUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingUser) {
      res.status(400);
      throw new Error("Email already exists");
    }
  }

  const user = await User.findByIdAndUpdate(
    id,
    { name, email, phone, status },
    { new: true, runValidators: true }
  );

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ message: "User updated successfully", user });
});

module.exports = {
  getStatus,
  searchUsers,
  getUserById,
  allUsers,
  createUser,
  updateUser,
};
