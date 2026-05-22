import Product from '../models/product.model.js';
import { errorHandler } from '../utils/error.js';

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, category, variants } = req.body;
        if (!name || !description || !category || !variants || variants.length === 0) {
            return next(errorHandler(400, 'Name, description, category, and at least one variant are required.'));
        }
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, message: 'Product created', data: savedProduct });
    } catch (error) {
        next(error);
    }
};

export const getAllProductsAdmin = async (req, res, next) => {
    try {
        const query = {};

        // --- NEW: Server-side category filtering ---
        // (Ignores 'All' category, which is for frontend only)
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }

        // --- NEW: Server-side search filtering ---
        if (req.query.search) {
            // Creates a case-insensitive search regex for the 'name' field
            query.name = { $regex: req.query.search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProductByIdAdmin = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(errorHandler(404, 'Product not found'));
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return next(errorHandler(404, 'Product not found'));
        }
        res.status(200).json({ success: true, message: 'Product updated', data: updatedProduct });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return next(errorHandler(404, 'Product not found'));
        }
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};
