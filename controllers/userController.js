import { fileURLToPath } from 'url';
import { ACTIVE } from '../constants/constants.js';
import User from '../models/UserModel.js';
// import multer from 'multer';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../uploads'), // Set the destination folder for uploads
//     filename: (req, file, cb) => {
//         // Generate a unique filename for the uploaded file
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

export const addUser = async (req, res) => {

    if (!req.file) {
        console.log(req.file);
        return res.status(405).json({ error: 'Please upload an image' });
    }

    const {
        mobileNo,
        firstName,
        lastName,
        role,
        password,
        image
    } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    //console.log(image);

    try {
        const user = await User.create({
            mobileNo,
            firstName,
            lastName,
            role,
            password,
            image: imagePath,
            status: ACTIVE,
        });

        res.status(201).json({ user, image });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}