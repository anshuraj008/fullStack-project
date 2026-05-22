import express from 'express';
import {
    createCustomizationOption,
    getAllCustomizationOptions,
    getCustomizationOptionById,
    updateCustomizationOption,
    deleteCustomizationOption
} from '../controllers/adminCustomization.controller.js';


const router = express.Router();


router.post('/', createCustomizationOption);
router.get('/', getAllCustomizationOptions);
router.get('/:id', getCustomizationOptionById);
router.put('/:id', updateCustomizationOption);
router.delete('/:id', deleteCustomizationOption);

export default router;