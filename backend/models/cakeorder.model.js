import mongoose from 'mongoose';

// A sub-schema for customization details, as specified in the "Custom Cake Maker" feature.
const CustomizationSchema = new mongoose.Schema({
    flavor: String,
    size: String,
    layers: Number,
    toppings: [String],
    decorations: [String],
    text: String,
    notes: String // For "Add notes or special requests"
}, { _id: false });

const CakeOrderSchema = new mongoose.Schema({
    // Link to the user who placed the order (assumes a User model exists).
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // The items in the order, supporting both pre-designed and custom cakes.
    item: {
        type: {
            type: String,
            required: true,
            enum: ['Custom', 'Pre-designed'],
            description: "Supports 'Category-wise Cakes' or 'Custom Cake Maker'."
        },
        // If it's a pre-designed cake, we store its ID.
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        // The specific customizations for this item.
        customizations: CustomizationSchema
    },
    // As per the workflow, the final price must be securely calculated on the server.
    totalPrice: {
        type: Number,
        required: true
    },
    // The order status, crucial for the admin panel and customer's "live tracking" feature.
    status: {
        type: String,
        required: true,
        enum: ['Pending Payment', 'Confirmed', 'Processing', 'Baking', 'Out for Delivery', 'Completed', 'Cancelled'],
        default: 'Pending Payment'
    },
    // Delivery and scheduling information as per the "Delivery & Pickup Options" feature.
    deliveryInfo: {
        deliveryType: {
            type: String,
            required: true,
            enum: ['Delivery', 'Pickup']
        },
        address: String, // For "Choose delivery address". Null if pickup.
        scheduledDate: {
            type: Date,
            required: true
        },
        timeSlot: {
            type: String,
            required: true
        },
        paymentDetails: {
        razorpayOrderId: String,
        razorpayPaymentId: String
        },
        assignedStaff: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields.
});

const CakeOrder = mongoose.model('CakeOrder', CakeOrderSchema);

export default CakeOrder;