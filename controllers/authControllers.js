import bcrypt from 'bcrypt'; // import bcrypt for hashing password

import { User, RefreshToken } from '../models/index.js'; // import User and RefreshToken model
import { generateToken, verifyToken } from '../utils/jwtUtils.js'; // import jwt utils

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body; // get email and password from request body

        const userExist = await User.findOne({ where: { email } }); // check if user exist

        if (userExist) { // check if user exist
            return res.status(400).json({ message: 'User already exist' }); // return error
        }

        const salt = await bcrypt.genSalt(10); // generate salt for hashing password
        const hashedPassword = await bcrypt.hash(password, salt); // hash password

        const user = await User.create({ // create user
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ user }); // return user
    } catch (error) {
        return res.status(500).json({ message: error.message }); // return error
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // get email and password from request body

        const user = await User.findOne({ where: { email } }); // check if user exist

        // check if user exist and password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate tokens
        const accessToken = generateToken(user.id, 'access'); 
        const refreshToken = generateToken(user.id, 'refresh'); 

        const decodedRefreshToken = verifyToken(refreshToken, 'refresh'); // decode refresh token
        // The decodedRefreshToken.exp property represents the expiration time of the token in UNIX timestamp format. By multiplying it by 1000 and passing it to the Date constructor, we convert it to a Date object representing the expiration date of the refresh token.
        const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000); // get expiration date of refresh token


        // save refresh token in db
        await RefreshToken.storeRefreshToken(user.id, refreshToken, refreshTokenExpiration); // store refresh token in db

        res.cookie('accessToken', accessToken, { // send access token to client
            httpOnly: true,  //The 'httpOnly' option ensures that the cookie is only accessible via HTTP(S) and cannot be accessed or modified by client-side JavaScript.
        });

        res.cookie('refreshToken', refreshToken, { // send refresh token to client
            httpOnly: true,           // httpOnly: true means that the cookie is not accessible from JavaScript. This is a security measure to prevent cross-site scripting (XSS) attacks.
            path: '/api/auth/refresh-token', // path: '/api/auth/refresh-token' means that the cookie is only sent to the /api/auth/refresh-token endpoint.
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
