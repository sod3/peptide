import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Allow guest checkout for now, but use authRequired if logged in
router.post('/checkout', (req, res, next) => {
    // Optional auth
    next();
}, createOrder);

export default router;
