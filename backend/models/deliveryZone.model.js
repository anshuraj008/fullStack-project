import mongoose from 'mongoose';

const DeliveryZoneSchema = new mongoose.Schema({
    zoneName: {
        type: String,
        required: [true, 'Zone name is required.'],
        trim: true,
        unique: true
    },
    // An array of postal codes that belong to this zone
    postalCodes: {
        type: [String],
        required: [true, 'At least one postal code is required.'],
        // Basic validation that items in array are strings
        validate: [v => Array.isArray(v) && v.length > 0, 'Postal codes must be a non-empty array']
    },
    deliveryFee: {
        type: Number,
        required: [true, 'Delivery fee is required.'],
        default: 0
    },
    area: { // e.g., "City Center, MG Road"
        type: String,
        trim: true
    },
    estimatedTime: { // e.g., "30-45 mins"
        type: String,
        trim: true
    },
    // Optional: Is this zone currently active?
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster lookups by postal code
DeliveryZoneSchema.index({ postalCodes: 1 });

const DeliveryZone = mongoose.model('DeliveryZone', DeliveryZoneSchema);
export default DeliveryZone;