import express from 'express';
import { getAllDeliveryStaff } from '../controllers/adminStaff.controller.js';
// import { verifyToken, verifyAdmin } from '../utils/verifyUser.js';

const router = express.Router();

// Apply auth middleware later: router.use(verifyToken, verifyAdmin);
router.get('/', getAllDeliveryStaff);

export default router;