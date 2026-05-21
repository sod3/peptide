import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dzp8qjwqy', // Extracted from provided key/context if possible, but user gave a key: EMokw28pOajfQ9oJXv9YXfQ45Us
    api_key: '235285876366524', // Use your Cloudinary credentials here
    api_secret: 'EMokw28pOajfQ9oJXv9YXfQ45Us' 
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'peptide_products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });

export { cloudinary, upload };
