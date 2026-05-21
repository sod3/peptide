import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';
import { products } from '../../src/data/products.ts'; // This might cause issues with ES modules, I'll copy data manually instead to be safe

dotenv.config();

const initialProducts = [
    {
        name: "BPC-157",
        slug: "bpc-157",
        sku: "PEPT-BPC-001",
        tagline: "Synthetic Pentadecapeptide",
        description: "A 15-amino-acid synthetic peptide derived from a protective protein found in gastric juice. Investigated for its role in angiogenesis and tissue-specific signaling pathways.",
        price: 64,
        mg: 5,
        purity: 99.2,
        category: "Tissue Repair",
        stock: 12,
        badge: "Bestseller",
        isBestseller: true,
        isActive: true
    },
    {
        name: "TB-500",
        slug: "tb-500",
        sku: "PEPT-TB-002",
        tagline: "Thymosin Beta-4 Fragment",
        description: "A synthetic fragment of the naturally occurring Thymosin Beta-4. Studied for its role in cellular migration and actin-binding research models.",
        price: 78,
        mg: 5,
        purity: 99.0,
        category: "Tissue Repair",
        stock: 2,
        isActive: true
    },
    {
        name: "CJC-1295 (No DAC)",
        slug: "cjc-1295",
        sku: "PEPT-CJC-003",
        tagline: "GHRH Analog",
        description: "A growth hormone-releasing hormone (GHRH) analog studied in pulsatile growth hormone research protocols.",
        price: 52,
        mg: 2,
        purity: 99.4,
        category: "Secretagogue Research",
        stock: 0,
        isActive: true
    },
    {
        name: "Ipamorelin",
        slug: "ipamorelin",
        sku: "PEPT-IPA-004",
        tagline: "Selective Ghrelin Mimetic",
        description: "A pentapeptide ghrelin mimetic studied for its highly selective GH-releasing profile in laboratory research models.",
        price: 49,
        mg: 5,
        purity: 99.3,
        category: "Secretagogue Research",
        stock: 45,
        badge: "New",
        isActive: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(initialProducts);
        console.log('✅ Synchronized initial products to MongoDB');

        process.exit(0);
    } catch (err) {
        console.error('Error seeding DB:', err);
        process.exit(1);
    }
};

seedDB();
