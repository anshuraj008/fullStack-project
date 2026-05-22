import User from '../models/User.js';
import DeliveryStaff from '../models/deliveryStaff.model.js';
import { errorHandler } from '../utils/error.js';

// @desc    Get all delivery staff with their details
// @route   GET /api/admin/staff
// @access  Admin
export const getAllDeliveryStaff = async (req, res, next) => {
    try {
        // Find all users with the role 'deliveryStaff'
        const staffUsers = await User.find({ role: 'deliveryStaff' })
            .select('userName email avatar'); // Add 'phone' if it's in your User model

        // Note: This is a simple implementation.
        // For stats like 'activeDeliveries', you would need a complex aggregation
        // to join with the Orders collection, which can be added later.

        res.status(200).json({ success: true, count: staffUsers.length, data: staffUsers });
    } catch (error) {
        console.error("Error fetching staff:", error);
        next(errorHandler(500, 'Failed to fetch delivery staff.'));
    }
};

// You would also add create/update/delete functions here
// e.g., createStaff, updateStaffStatus, etc.
