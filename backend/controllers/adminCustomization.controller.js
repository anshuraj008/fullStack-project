import CustomizationOption from '../models/customizationOption.model.js';
import { errorHandler } from '../utils/error.js';

export const createCustomizationOption = async (req, res, next) => {
    try {
        const { name, type, price } = req.body;
        // Basic validation
        if (!name || !type || price === undefined) {
            return next(errorHandler(400, 'Name, type, and price are required.'));
        }
        const newOption = new CustomizationOption(req.body);
        const savedOption = await newOption.save();
        res.status(201).json({ success: true, message: 'Customization option created', data: savedOption });
    } catch (error) {
        // Handle potential validation errors (e.g., invalid 'type')
        if (error.name === 'ValidationError') {
            return next(errorHandler(400, error.message));
        }
        next(error);
    }
};

export const getAllCustomizationOptions = async (req, res, next) => {
    try {
        // Fetch all and sort by type, then name
        const options = await CustomizationOption.find().sort({ type: 1, name: 1 });
        res.status(200).json({ success: true, count: options.length, data: options });
    } catch (error) {
        next(error);
    }
};

export const getCustomizationOptionById = async (req, res, next) => {
    try {
        const option = await CustomizationOption.findById(req.params.id);
        if (!option) {
            return next(errorHandler(404, 'Customization option not found'));
        }
        res.status(200).json({ success: true, data: option });
    } catch (error) {
        next(error);
    }
};

export const updateCustomizationOption = async (req, res, next) => {
    try {
        const updatedOption = await CustomizationOption.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOption) {
            return next(errorHandler(404, 'Customization option not found'));
        }
        res.status(200).json({ success: true, message: 'Customization option updated', data: updatedOption });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(errorHandler(400, error.message));
        }
        next(error);
    }
};

export const deleteCustomizationOption = async (req, res, next) => {
    try {
        const deletedOption = await CustomizationOption.findByIdAndDelete(req.params.id);
        if (!deletedOption) {
            return next(errorHandler(404, 'Customization option not found'));
        }
        res.status(200).json({ success: true, message: 'Customization option deleted' });
    } catch (error) {
        next(error);
    }
};
