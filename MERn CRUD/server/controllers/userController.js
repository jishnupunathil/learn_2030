const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//get Status
const getStatus = asyncHandler (async (req, res) => {
  console.log("🚀 ~ req:", req)
  
    const statusCounts = await User.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

     const totalUsers = statusCounts.reduce(
      (acc, curr) => acc + curr.count,
      0
    );
    const activeUsers =
      statusCounts.find((s) => s._id === "active")?.count || 0;

    const inactiveUsers =
      statusCounts.find((s) => s._id === "inactive")?.count || 0;

      res.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
    });
});




const searchUsers = asyncHandler(async (req, res) => {
 
    const {query} = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchFields = ["name", "email", "status", "phone"];

    const searchQuery = query
    ? {
        $or: searchFields.map((field) => ({
          [field]: { $regex: query, $options: "i" }
        }))
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

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user);

});

module.exports = {
  getStatus,
  searchUsers,
  getUserById,
};
