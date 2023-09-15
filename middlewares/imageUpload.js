import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilePicStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/profile-pics'), // Set the destination folder for uploads
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const materialImageStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/material-images'), // Set the destination folder for uploads
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const customCostumesImageStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/costume-images'), // Set the destination folder for uploads
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const accessoriesImageStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/accessories-images'), // Set the destination folder for uploads
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const costumesImageStorage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/sell-costumes-images'), // Set the destination folder for uploads
    filename: (req, file, cb) => {
        // Generate a unique filename for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const profilePicUpload = multer({ storage: profilePicStorage });
export const materialImageUpload = multer({ storage: materialImageStorage });
export const costumeImageUpload = multer({ storage: costumesImageStorage });
export const accessoryImageUpload = multer({ storage: accessoriesImageStorage });