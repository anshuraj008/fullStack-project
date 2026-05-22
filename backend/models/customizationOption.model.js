import mongoose from 'mongoose';

const CustomizationOptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Option name is required.'],
        trim: true
    },
    
    type: {
        type: String,
        required: [true, 'Option type is required.'],
        enum: ['Flavor', 'Topping', 'Size', 'Decoration', 'Frosting', 'Filling'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        default: 0
    },
    description: {
        type: String,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
CustomizationOptionSchema.index({ type: 1 });

const CustomizationOption = mongoose.model('CustomizationOption', CustomizationOptionSchema);
export default CustomizationOption;