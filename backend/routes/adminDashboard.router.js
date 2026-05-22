import express from 'express';
import { getDashboardStats, getSalesAnalytics, getCategorySales } from '../controllers/adminDashboard.controller.js';


const router = express.Router();


router.get('/stats', getDashboardStats);
router.get('/sales-analytics', getSalesAnalytics); // <<< ADD NEW ROUTE
router.get('/category-sales', getCategorySales);

export default router;