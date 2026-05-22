import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
    size: { type: String, required: true },
    price: { type: Number, required: true },
    servings: String
}, { _id: false });

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true, enum: ['Bento Cakes', 'Birthday Cakes', 'Wedding Cakes', 'Seasonal Specials'] },
    variants: { type: [VariantSchema], required: true },
    isFeatured: { type: Boolean, default: false },
    flavor: String,
    frosting: String
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;