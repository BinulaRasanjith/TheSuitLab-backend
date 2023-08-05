import { User, RefreshToken } from '../models/models.js'; // import User and RefreshToken model
import { generateToken, verifyToken } from '../utils/jwtUtils.js'; // import jwt utils
import { ACCESS, REFRESH, VALID, INVALID, EXPIRED } from '../constants/constants.js'; // import constants

export const signup = async (req, res) => {
    try {
        const {
            mobile_no,
            first_name,
            last_name,
            email, // TODO: check???
            confirm_password,
            password,
        } = req.body; // get email and password from request body

        // check if user exist
        const userExist = await User.findOne({ where: { mobile_no } });
        if (userExist) {
            return res.status(400).json({ message: 'User already exist' }); // return error
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: 'Password and Confirm Password do not match' }); // return error
        }
        // create user
        const user = await User.create({
            mobile_no,
            email,
            first_name,
            last_name,
            password,
            status: 'active',
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
        if (!user || !(await user.isValidPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate tokens
        const accessToken = generateToken(user, ACCESS);
        const refreshToken = generateToken(user, REFRESH);

        const decodedRefreshToken = verifyToken(refreshToken, REFRESH); // decode refresh token
        // The decodedRefreshToken.exp property represents the expiration time of the token in UNIX timestamp format. By multiplying it by 1000 and passing it to the Date constructor, we convert it to a Date object representing the expiration date of the refresh token.
        const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000); // get expiration date of refresh token


        // save refresh token in db
        await RefreshToken.storeRefreshToken(user.id, refreshToken, refreshTokenExpiration); // store refresh token in db

        res.cookie('refreshToken', refreshToken, { // send refresh token to client
            httpOnly: true, // httpOnly: true means that the cookie is not accessible from JavaScript. This is a security measure to prevent cross-site scripting (XSS) attacks.
            path: '/api/auth/refresh-token', // path: '/api/auth/refresh-token' means that the cookie is only sent to the /api/auth/refresh-token endpoint.
            sameSite: 'strict'
        });

        // return res.status(200).json({ message: 'Login successful', user });
        return res.status(200).json({ message: 'Login successful', accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { googleAccessToken } = req.body; // get access token from request body
        const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`
        fetch(url) // fetch user info from google
            .then((res) => res.json())
            .then(async (data) => {
                return res.status(200).json({ message: 'Login successful', user: data });
            })
            .catch((err) => {
                return res.status(500).json({ message: err.message });
            });
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
        const { user } = verifyToken(refreshToken, REFRESH);

        // Check if the refresh token is valid
        const isValid = await RefreshToken.isValidToken(user.id, refreshToken);

        switch (isValid) {
            case VALID:
                // Generate new access token
                const accessToken = generateToken(user, ACCESS);

                return res.status(200).json({ message: 'Token refreshed', accessToken });

            case INVALID:
                return res.status(401).json({ message: 'Invalid refresh token' });

            case EXPIRED:
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
