import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Can be null for system events or failed logins
    },
    action: {
        type: String,
        required: true,
        enum: [
            'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'LOGOUT', 
            'PRODUCT_CREATE', 'PRODUCT_UPDATE', 'PRODUCT_DELETE',
            'STOCK_UPDATE', 'ORDER_STATUS_CHANGE', 'REVENUE_ACCESS',
            'UNAUTHORIZED_ACCESS_ATTEMPT', 'SYSTEM_ERROR'
        ]
    },
    details: {
        type: mongoose.Schema.Types.Mixed
    },
    ipAddress: String,
    userAgent: String,
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    severity: {
        type: String,
        enum: ['info', 'warning', 'critical'],
        default: 'info'
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const Log = mongoose.model('Log', logSchema);

export default Log;
