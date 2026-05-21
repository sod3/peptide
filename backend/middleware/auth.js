import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authRequired = async (req, res, next) => {
    try {
        let token;
        
        // Get token from cookies
        if (req.signedCookies && req.signedCookies.token) {
            token = req.signedCookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user still exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User no longer exists' });
        }

        // Pass user to request object
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'You do not have permission to perform this action' 
            });
        }
        next();
    };
};

export const ownerOnly = restrictTo('owner');
export const adminOnly = restrictTo('owner', 'admin');
export const staffOnly = restrictTo('owner', 'admin', 'manager');
