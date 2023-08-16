import { ACTIVE } from '../constants/constants.js';
import User from '../models/UserModel.js';

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

// get users by role
export const getUsers = async (req, res) => {
    try {
        const roles = req.body.roles;

        const condition = roles ? { role: roles } : {};
        const users = await User.findAll({
            where: condition
        });

        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}