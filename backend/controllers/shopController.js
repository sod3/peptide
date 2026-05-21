import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const { category, sort, q, minPrice, maxPrice } = req.query;
        
        let query = { isActive: true };
        
        if (category && category !== 'All') {
            query.category = category;
        }
        
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { tagline: { $regex: q, $options: 'i' } }
            ];
        }
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption = {};
        if (sort === 'Price: Low to High') sortOption.price = 1;
        else if (sort === 'Price: High to Low') sortOption.price = -1;
        else if (sort === 'Purity') sortOption.purity = -1;
        else sortOption.createdAt = -1; // Featured / Newest

        const products = await Product.find(query).sort(sortOption);
        
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: products
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

export const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug, isActive: true });
        
        if (!product) {
            return res.status(404).json({ status: 'fail', message: 'Product not found' });
        }
        
        // Increment views
        product.analytics.views += 1;
        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
