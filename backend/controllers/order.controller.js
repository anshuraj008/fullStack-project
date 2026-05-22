import CakeOrder from '../models/cakeorder.model.js';
import User from '../models/User.js';
import { errorHandler } from '../utils/error.js';

// Create new order
export const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id; // From verifyToken middleware

        const {
            item,
            totalPrice,
            status,
            deliveryInfo
        } = req.body;

        // Validate required fields
        if (!item || !totalPrice || !deliveryInfo) {
            return next(errorHandler(400, 'Missing required fields'));
        }

        // Create order
        const newOrder = new CakeOrder({
            userId,
            item,
            totalPrice,
            status: status || 'Pending Payment',
            deliveryInfo
        });

        const savedOrder = await newOrder.save();

        // Populate user details
        const populatedOrder = await CakeOrder.findById(savedOrder._id)
            .populate('userId', 'userName email phone');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: populatedOrder
        });
    } catch (error) {
        console.error('Create order error:', error);
        next(error);
    }
};

// Get customer's orders
export const getCustomerOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const orders = await CakeOrder.find({ userId })
            .populate('item.productId', 'name price image')
            .populate('deliveryInfo.assignedStaff', 'userName phone')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error('Get customer orders error:', error);
        next(error);
    }
};

// Get specific order by ID
export const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const order = await CakeOrder.findOne({ _id: orderId, userId })
            .populate('userId', 'userName email phone')
            .populate('item.productId', 'name price image')
            .populate('deliveryInfo.assignedStaff', 'userName phone');

        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error('Get order by ID error:', error);
        next(error);
    }
};

// Cancel order
export const cancelOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const order = await CakeOrder.findOne({ _id: orderId, userId });

        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }

        // Only allow cancellation if order is not yet processed
        const cancellableStatuses = ['Pending Payment', 'Confirmed', 'Processing'];
        if (!cancellableStatuses.includes(order.status)) {
            return next(errorHandler(400, `Cannot cancel order with status: ${order.status}`));
        }

        order.status = 'Cancelled';
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            data: order
        });
    } catch (error) {
        console.error('Cancel order error:', error);
        next(error);
    }
};
