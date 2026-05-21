import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
        unique: true,
        uppercase: true
    },
    tagline: {
        type: String,
        required: [true, 'Tagline is required']
    },
    shortDescription: String,
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    costPrice: {
        type: Number,
        default: 0
    },
    mg: {
        type: Number,
        required: [true, 'MG per vial is required']
    },
    purity: {
        type: Number,
        default: 99.0
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ["Tissue Repair", "Athletic Research", "Secretagogue Research", "Cellular Senescence", "Metabolic Research"]
    },
    images: [{
        url: String,
        publicId: String
    }],
    thumbnail: String,
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        default: 0,
        min: 0
    },
    lowStockThreshold: {
        type: Number,
        default: 3
    },
    badge: String,
    isBestseller: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    specifications: {
        lotNumber: String,
        testMethod: { type: String, default: "RP-HPLC + ESI-MS" },
        appearance: { type: String, default: "White lyophilized powder" },
        storage: { type: String, default: "≤ -20°C, desiccated" }
    },
    analytics: {
        views: { type: Number, default: 0 },
        sales: { type: Number, default: 0 },
        conversionRate: { type: Number, default: 0 }
    }
}, {
    timestamps: true
});

productSchema.index({ name: 'text', sku: 'text', tagline: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
