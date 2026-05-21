import express from 'express';
import { login, logout, refreshToken, getMe } from '../controllers/authController.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/me', authRequired, getMe);

export default router;
