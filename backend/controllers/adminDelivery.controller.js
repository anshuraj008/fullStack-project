import DeliveryZone from '../models/deliveryZone.model.js';
import { errorHandler } from '../utils/error.js';

// @desc    Create a new delivery zone
// @route   POST /api/admin/delivery-zones
// @access  Admin (add auth middleware later)
export const createDeliveryZone = async (req, res, next) => {
    try {
        const { zoneName, postalCodes, deliveryFee } = req.body;
        // Basic validation
        if (!zoneName || !postalCodes || !Array.isArray(postalCodes) || postalCodes.length === 0 || deliveryFee === undefined) {
            return next(errorHandler(400, 'Zone name, a non-empty array of postal codes, and a delivery fee are required.'));
        }
        const newZone = new DeliveryZone(req.body);
        const savedZone = await newZone.save();
        res.status(201).json({ success: true, message: 'Delivery zone created', data: savedZone });
    } catch (error) {
        // Handle duplicate zoneName error
        if (error.code === 11000) {
            return next(errorHandler(400, 'A delivery zone with this name already exists.'));
        }
        if (error.name === 'ValidationError') {
            return next(errorHandler(400, error.message));
        }
        next(error);
    }
};

// @desc    Get all delivery zones
// @route   GET /api/admin/delivery-zones
// @access  Admin (add auth middleware later)
export const getAllDeliveryZones = async (req, res, next) => {
    try {
        const zones = await DeliveryZone.find().sort({ zoneName: 1 });
        res.status(200).json({ success: true, count: zones.length, data: zones });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single delivery zone by ID
// @route   GET /api/admin/delivery-zones/:id
// @access  Admin (add auth middleware later)
export const getDeliveryZoneById = async (req, res, next) => {
    try {
        const zone = await DeliveryZone.findById(req.params.id);
        if (!zone) {
            return next(errorHandler(404, 'Delivery zone not found'));
        }
        res.status(200).json({ success: true, data: zone });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a delivery zone
// @route   PUT /api/admin/delivery-zones/:id
// @access  Admin (add auth middleware later)
export const updateDeliveryZone = async (req, res, next) => {
    try {
        const updatedZone = await DeliveryZone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedZone) {
            return next(errorHandler(404, 'Delivery zone not found'));
        }
        res.status(200).json({ success: true, message: 'Delivery zone updated', data: updatedZone });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(errorHandler(400, error.message));
        }
        next(error);
    }
};

// @desc    Delete a delivery zone
// @route   DELETE /api/admin/delivery-zones/:id
// @access  Admin (add auth middleware later)
export const deleteDeliveryZone = async (req, res, next) => {
    try {
        const deletedZone = await DeliveryZone.findByIdAndDelete(req.params.id);
        if (!deletedZone) {
            return next(errorHandler(404, 'Delivery zone not found'));
        }
        res.status(200).json({ success: true, message: 'Delivery zone deleted' });
    } catch (error) {
        next(error);
    }
};
