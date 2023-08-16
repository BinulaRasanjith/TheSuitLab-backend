import { ACTIVE } from '../constants/constants.js';
import User from '../models/UserModel.js';

export const addUser = async (req, res) => {
    const {
        mobileNo,
        firstName,
        lastName,
        role,
        password } = req.body;

    try {
        const user = await User.create({
            mobileNo,
            firstName,
            lastName,
            role,
            password,
            status: ACTIVE,
        });

        res.status(201).json({ user });
    } catch (error) {
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