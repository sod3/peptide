import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Log from '../models/Log.js';

export const getDashboardStats = async (req, res) => {
    try {
        // Today's starts
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const [
            totalRevenue,
            totalOrders,
            totalCustomers,
            activeProducts,
            recentOrders,
            lowStockProducts
        ] = await Promise.all([
            Order.aggregate([
                { $match: { paymentStatus: 'paid' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' }, profit: { $sum: '$netProfit' } } }
            ]),
            Order.countDocuments(),
            User.countDocuments({ role: 'customer' }),
            Product.countDocuments({ isActive: true }),
            Order.find().sort('-createdAt').limit(5).populate('customer', 'name email'),
            Product.find({ stock: { $lte: 3 } }).limit(5)
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats: {
                    revenue: totalRevenue[0]?.total || 0,
                    profit: totalRevenue[0]?.profit || 0,
                    orders: totalOrders,
                    customers: totalCustomers,
                    activeProducts: activeProducts
                },
                recentOrders,
                lowStockProducts
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getRevenueAnalytics = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            { $match: { paymentStatus: 'paid' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$totalAmount" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } },
            { $limit: 30 }
        ]);

        res.status(200).json({ status: 'success', data: stats });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const product = await Product.findByIdAndUpdate(
            productId,
            { $set: { stock: quantity } },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Log the stock update
        await Log.create({
            user: req.user._id,
            action: 'STOCK_UPDATE',
            details: { productId, oldStock: product.stock - quantity, newStock: quantity },
            resourceId: productId
        });

        res.status(200).json({ status: 'success', data: product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        
        // Handle images if uploaded via multer-cloudinary
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => ({
                url: file.path,
                publicId: file.filename
            }));
            productData.thumbnail = req.files[0].path;
        }

        const product = await Product.create(productData);

        // Log the creation
        await Log.create({
            user: req.user._id,
            action: 'PRODUCT_CREATE',
            details: { name: product.name, sku: product.sku },
            resourceId: product._id
        });

        res.status(201).json({
            status: 'success',
            data: product
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};
