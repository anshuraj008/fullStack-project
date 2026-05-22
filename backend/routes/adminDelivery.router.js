import express from 'express';
import {
    createDeliveryZone,
    getAllDeliveryZones,
    getDeliveryZoneById,
    updateDeliveryZone,
    deleteDeliveryZone
} from '../controllers/adminDelivery.controller.js';
// Add authentication middleware here later
// import { verifyToken, verifyAdmin } from '../utils/verifyUser.js';

const router = express.Router();

// Apply auth middleware later: router.use(verifyToken, verifyAdmin);

router.post('/', createDeliveryZone);
router.get('/', getAllDeliveryZones);
router.get('/:id', getDeliveryZoneById);
router.put('/:id', updateDeliveryZone);
router.delete('/:id', deleteDeliveryZone);

export default router;