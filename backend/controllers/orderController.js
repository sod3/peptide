import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        const userId = req.user ? req.user._id : null; // Guest or logged in user

        let totalAmount = 0;
        let totalCost = 0;
        const processedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId).session(session);
            
            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`);
            }

            // Update stock
            product.stock -= item.quantity;
            product.analytics.sales += item.quantity;
            await product.save({ session });

            processedItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;
            totalCost += (product.costPrice || 0) * item.quantity;
        }

        const netProfit = totalAmount - totalCost;

        const order = await Order.create([{
            customer: userId,
            items: processedItems,
            totalAmount,
            netProfit,
            shippingAddress,
            paymentMethod,
            paymentStatus: 'paid' // Simulating successful payment
        }], { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            status: 'success',
            data: order[0]
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ status: 'error', message: err.message });
    }
};
