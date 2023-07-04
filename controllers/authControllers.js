import bcrypt from 'bcrypt';

import { User, RefreshToken } from '../models/index.js';
import { generateToken, verifyToken } from '../utils/jwtUtils.js';

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
            return res.status(400).json({ message: 'User already exist' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        // check if user exist and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate tokens
        const accessToken = generateToken(user.id, 'access');
        const refreshToken = generateToken(user.id, 'refresh');

        const decodedRefreshToken = verifyToken(refreshToken, 'refresh');
        const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000);

        // save refresh token in db
        await RefreshToken.storeRefreshToken(user.id, refreshToken, refreshTokenExpiration);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/auth/refresh-token',
        });

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        // Check if the refresh token exists
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        // Verify the refresh token
        const { user: { id } } = verifyToken(refreshToken, 'refresh');

        // Check if the refresh token is valid
        const isValid = await RefreshToken.isValidToken(id, refreshToken);

        switch (isValid) {
            case 'valid':
                // Generate new access token
                const accessToken = generateToken(id, 'access');

                // Send the access token to the client
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                });
                return res.status(200).json({ message: 'Token refreshed' });

            case 'not-valid':
                return res.status(401).json({ message: 'Invalid refresh token' });

            case 'expired':
                return res.status(401).json({ message: 'Refresh token expired' });

            default:
                return res.status(401).json({ message: 'Something went wrong' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        const userId = req.user.id;

        // Delete the refresh token from the database
        await RefreshToken.destroy({ where: { userId } });

        // Clear the cookies containing the tokens
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
