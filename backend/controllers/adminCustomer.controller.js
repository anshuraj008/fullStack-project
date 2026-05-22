import User from '../models/User.js';
import CakeOrder from '../models/cakeorder.model.js'; // We need this to calculate stats
import { errorHandler } from '../utils/error.js';

// @desc    Get all registered customers with their order stats
// @route   GET /api/admin/customers
// @access  Admin (add auth middleware later)
export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await User.aggregate([
            {
                // Step 1: Find all users with the role 'customer'
                $match: { role: 'customer' }
            },
            {
                // Step 2: Join with the 'cakeorders' collection
                $lookup: {
                    from: 'cakeorders', // The name of the orders collection in MongoDB
                    localField: '_id', // The field from the User model
                    foreignField: 'userId', // The field from the CakeOrder model
                    as: 'orders' // Name the new array 'orders'
                }
            },
            {
                // Step 3: Create new fields based on the 'orders' array
                $addFields: {
                    totalOrders: { $size: '$orders' }, // Get the total number of orders
                    totalSpent: { $sum: '$orders.totalPrice' }, // Sum the 'totalPrice' of all orders
                    
                    // Simple loyalty points logic (e.g., 1 point per rupee spent)
                    // You can make this logic more complex later
                    loyaltyPoints: { $floor: { $sum: '$orders.totalPrice' } }, 
                    
                    // Find the date of the most recent order
                    lastOrder: { $max: '$orders.createdAt' } 
                }
            },
            {
                // Step 4: Define the final output fields
                $project: {
                    _id: 1,
                    userName: 1,
                    email: 1,
                    avatar: 1,
                    joinedDate: '$createdAt', // Rename createdAt to joinedDate
                    totalOrders: 1,
                    totalSpent: 1,
                    loyaltyPoints: 1,
                    lastOrder: 1,
                    // We don't need to send the full 'orders' array to the list view
                }
            },
            {
                // Step 5: Sort by newest customers
                $sort: { joinedDate: -1 }
            }
        ]);

        res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (error) {
        console.error("Error fetching customers:", error);
        next(errorHandler(500, 'Failed to fetch customers.'));
    }
};
