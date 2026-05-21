import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Log from '../models/Log.js';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};

const signRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        sameSite: 'strict'
    };

    const refreshCookieOptions = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        sameSite: 'strict',
        path: '/api/auth/refresh' // Only send to refresh endpoint
    };

    res.cookie('token', token, cookieOptions);
    res.cookie('refreshToken', refreshToken, refreshCookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        user
    });
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            // Log failed attempt
            await Log.create({
                action: 'LOGIN_FAILURE',
                details: { email },
                ipAddress: req.ip,
                severity: 'warning'
            });
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        // Check if account is locked (optional implementation)
        
        // Log successful login
        await Log.create({
            user: user._id,
            action: 'LOGIN_SUCCESS',
            ipAddress: req.ip
        });

        user.lastLogin = Date.now();
        await user.save({ validateBeforeSave: false });

        sendToken(user, 200, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        signed: true
    });
    res.cookie('refreshToken', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        signed: true,
        path: '/api/auth/refresh'
    });
    res.status(200).json({ status: 'success' });
};

export const refreshToken = async (req, res) => {
    try {
        const rToken = req.signedCookies.refreshToken;

        if (!rToken) {
            return res.status(401).json({ message: 'No refresh token' });
        }

        const decoded = jwt.verify(rToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        sendToken(user, 200, res);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

export const getMe = (req, res) => {
    res.status(200).json({
        status: 'success',
        user: req.user
    });
};
