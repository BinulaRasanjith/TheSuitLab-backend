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