import express from 'express';
import {
    createProduct,
    getAllProductsAdmin,
    getProductByIdAdmin,
    updateProduct,
    deleteProduct
} from '../controllers/adminProduct.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProductsAdmin);
router.get('/:id', getProductByIdAdmin);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;