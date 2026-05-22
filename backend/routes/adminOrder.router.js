import express from 'express';
import {
    getAllOrdersAdmin,
    getOrderDetailsAdmin,
    updateOrderStatus,
    assignDeliveryStaff
} from '../controllers/adminOrder.controller.js';

const router = express.Router();


// Get all orders (for admin)
router.get('/', getAllOrdersAdmin);

// Get details for a single order (for admin)
router.get('/:id', getOrderDetailsAdmin);

// Update order status (triggers notification)
router.patch('/:id/status', updateOrderStatus);

// Assign delivery staff
router.patch('/:id/assign-staff', assignDeliveryStaff);


export default router;