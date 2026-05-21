import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createInitialAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminExists = await User.findOne({ role: 'owner' });
        if (adminExists) {
            console.log('Admin already exists:', adminExists.email);
            process.exit(0);
        }

        const admin = new User({
            name: 'System Owner',
            email: 'owner@peptide.bio',
            password: 'SecurePassword123!', // User should change this
            role: 'owner'
        });

        await admin.save();
        console.log('✅ Initial Admin (Owner) created successfully');
        console.log('Email: owner@peptide.bio');
        console.log('Password: SecurePassword123!');
        
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
};

createInitialAdmin();
