import { ACTIVE } from '../constants/constants.js';
import User from '../models/UserModel.js';

export const addUser = async (req, res) => {
    const {
        mobileNo,
        firstName,
        lastName,
        role,
        password,
        image,
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

export const setUserProgress = async (req, res) => {
    const { id, progress } = req.body;

    try {
        const user = await User.findOne({ where: { userId: id } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            user.progress = progress;
            await user.save();
            res.status(200).json({ message: "User activated" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
