const User = require('../models/userModel');



//get Status
const getStatus = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'active' });
        const inactiveUsers = await User.countDocuments({ status: 'inactive' });

        res.json({
            totalUsers,
            activeUsers,
            inactiveUsers
        });

    }catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    getStatus
};