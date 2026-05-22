import CakeOrder from '../models/cakeorder.model.js';
import User from '../models/User.js'; 
import { errorHandler } from '../utils/error.js';


export const getAllOrdersAdmin = async (req, res, next) => {
    try {
        const query = {};

        // --- NEW: Server-side status filtering ---
        // If the query param is 'All', we don't add any status filter
        if (req.query.status && req.query.status !== 'All') {
            query.status = req.query.status;
        }
        // --- END NEW ---

        // We don't need a limit here, as the admin needs all orders for the filters
        const orders = await CakeOrder.find(query)
            .populate('userId', 'userName email') // Populates customer details
            .populate('item.productId', 'name') // --- NEW: Populate product name ---
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        next(error);
    }
};

export const getOrderDetailsAdmin = async (req, res, next) => {
    try {
        const order = await CakeOrder.findById(req.params.id)
            .populate('userId', 'userName email');
        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Confirmed', 'Processing', 'Baking', 'Out for Delivery', 'Completed', 'Cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return next(errorHandler(400, 'Invalid status provided.'));
        }

        // Update the order first
        const order = await CakeOrder.findByIdAndUpdate(id, { status }, { new: true })
            .populate('userId', 'userName email'); // Keep populate to get user email if needed elsewhere

        if (!order) {
            return next(errorHandler(404, 'Order not found.'));
        }

        const user = await User.findById(order.userId._id); // Find the user document

        // Notification sending disabled (Firebase config not present). Add messaging here if configured.

        res.status(200).json({ success: true, message: "Order status updated.", data: order });

    } catch (error) {
        next(error);
    }
};

export const assignDeliveryStaff = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { staffId } = req.body;
        if (!staffId) {
            return next(errorHandler(400, 'Staff ID is required.'));
        }

        const order = await CakeOrder.findByIdAndUpdate(
            id,
            { 'deliveryInfo.assignedStaff': staffId },
            { new: true }
        );
        if (!order) {
            return next(errorHandler(404, 'Order not found.'));
        }
        res.status(200).json({ success: true, message: 'Delivery staff assigned.', data: order });
    } catch (error) {
        next(error);
    }
};
