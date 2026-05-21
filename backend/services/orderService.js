import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Log from '../models/Log.js';
import mongoose from 'mongoose';

export const createOrder = async (orderData) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { customerId, items, shippingAddress } = orderData;
        let totalAmount = 0;
        let netProfit = 0;
        const processedItems = [];

        // 1. Verify and Reduce Stock
        for (const item of items) {
            const product = await Product.findById(item.productId).session(session);
            
            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
            }

            // Reduce stock
            product.stock -= item.quantity;
            product.analytics.sales += item.quantity;
            await product.save({ session });

            // Calculate amounts
            totalAmount += product.price * item.quantity;
            netProfit += (product.price - product.costPrice) * item.quantity;

            processedItems.push({
                product: product._id,
                name: product.name,
                quantity: item.quantity,
                price: product.price
            });

            // Log stock reduction
            await Log.create([{
                action: 'STOCK_UPDATE',
                details: { 
                    productId: product._id, 
                    change: -item.quantity, 
                    reason: 'ORDER_PLACEMENT',
                    newStock: product.stock 
                },
                resourceId: product._id,
                severity: product.stock <= 3 ? 'warning' : 'info'
            }], { session });
        }

        // 2. Create Order
        const order = new Order({
            customer: customerId,
            items: processedItems,
            totalAmount,
            netProfit,
            shippingAddress,
            status: 'pending',
            timeline: [{ status: 'pending', note: 'Order placed by customer' }]
        });

        await order.save({ session });

        await session.commitTransaction();
        return order;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
};
