import express from 'express';
import { getDashboardStats, getRevenueAnalytics, updateStock, createProduct } from '../controllers/adminController.js';
import { authRequired, adminOnly, ownerOnly } from '../middleware/auth.js';
import { upload } from '../services/imageService.js';

const router = express.Router();

// All admin routes require authentication and at least admin role
router.use(authRequired);
router.use(adminOnly);

router.get('/stats', getDashboardStats);
router.get('/analytics/revenue', ownerOnly, getRevenueAnalytics); // Revenue analytics restricted to owner
router.patch('/inventory/stock', updateStock);
router.post('/products', upload.array('images', 5), createProduct);

export default router;
