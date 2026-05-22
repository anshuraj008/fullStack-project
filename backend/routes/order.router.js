import express from 'express';
import { 
    createOrder, 
    getCustomerOrders, 
    getOrderById,
    cancelOrder 
} from '../controllers/order.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Create new order
router.post('/', createOrder);

// Get customer's orders
router.get('/my-orders', getCustomerOrders);

// Get specific order by ID
router.get('/:id', getOrderById);

// Cancel order
router.patch('/:id/cancel', cancelOrder);

export default router;
