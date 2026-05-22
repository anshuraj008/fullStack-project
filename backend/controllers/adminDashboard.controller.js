import CakeOrder from '../models/cakeorder.model.js';
import User from '../models/User.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

// @desc    Get dashboard statistics based on a time period
// @route   GET /api/admin/dashboard/stats?period=today|week|month
// @access  Admin (add auth middleware later)
export const getDashboardStats = async (req, res, next) => {
    try {
        const period = req.query.period || 'today'; 
        let startDate, endDate = new Date(); 

        startDate = new Date();
        startDate.setHours(0, 0, 0, 0); 

        if (period === 'week') {
            const dayOfWeek = startDate.getDay(); 
            startDate.setDate(startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); 
            startDate.setHours(0, 0, 0, 0);
        } else if (period === 'month') {
            startDate.setDate(1); 
            startDate.setHours(0, 0, 0, 0);
        }
        endDate.setHours(23, 59, 59, 999);

        const orderStats = await CakeOrder.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: { $in: ['Pending Payment', 'Confirmed', 'Processing', 'Baking', 'Out for Delivery', 'Completed'] }
                }
            },
            {
                $group: {
                    _id: null, 
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$totalPrice' }
                }
            },
            { $project: { _id: 0 } } 
        ]);

        const result = orderStats[0] || { totalOrders: 0, totalRevenue: 0 };

        result.totalCustomers = await User.countDocuments({ role: 'customer' });
        result.totalProducts = await Product.countDocuments();

        result.period = period;
        result.startDate = startDate.toISOString();
        result.endDate = endDate.toISOString();

        res.status(200).json({ success: true, data: result });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        next(errorHandler(500, 'Failed to fetch dashboard stats'));
    }
};

export const getSalesAnalytics = async (req, res, next) => {
    try {
        const salesData = await CakeOrder.aggregate([
            {
                $match: {
                    status: { $in: ['Confirmed', 'Processing', 'Baking', 'Out for Delivery', 'Completed'] },
                    createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } // Last 7 days
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by day
                    sales: { $sum: "$totalPrice" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }, // Sort by date ascending
            { $project: { _id: 0, name: "$_id", sales: 1, orders: 1 } } // Rename _id to name for the chart
        ]);
        res.status(200).json({ success: true, data: salesData });
    } catch (error) {
        next(error);
    }
};

export const getCategorySales = async (req, res, next) => {
    try {
        const categoryData = await CakeOrder.aggregate([
            {
                $match: { status: { $in: ['Confirmed', 'Processing', 'Baking', 'Out for Delivery', 'Completed'] } }
            },
            {
                $lookup: { // Join with the 'products' collection
                    from: 'products',
                    localField: 'item.productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            { $unwind: "$productDetails" }, // Deconstruct the array
            {
                $group: {
                    _id: "$productDetails.category", // Group by the product's category
                    value: { $sum: "$totalPrice" } // Sum the total price for each category
                }
            },
            { $project: { _id: 0, name: "$_id", value: 1 } } // Rename _id to name for the chart
        ]);

        // Manually add colors to match your frontend sample data
        const colors = ['#F8BBD9', '#E8A5C8', '#FFE4E1', '#A8D5A8'];
        const dataWithColors = categoryData.map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }));
        
        res.status(200).json({ success: true, data: dataWithColors });
    } catch (error) {
        next(error);
    }
};
