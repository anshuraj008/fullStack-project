import mongoose from 'mongoose';

const DeliveryStaffSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    vehicle: {
        type: String,
        trim: true,
        default: 'Not specified'
    },
    status: {
        type: String,
        enum: ['Available', 'Active', 'Offline'],
        default: 'Offline'
    }
}, { timestamps: true });

const DeliveryStaff = mongoose.model('DeliveryStaff', DeliveryStaffSchema);
export default DeliveryStaff;