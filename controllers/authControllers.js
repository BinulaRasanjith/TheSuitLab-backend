import { User, RefreshToken, Customer } from '../models/models.js'; // import User and RefreshToken model
import { generateToken, verifyToken } from '../utils/jwtUtils.js'; // import jwt utils
import { ACCESS, REFRESH, VALID, INVALID, EXPIRED, ACTIVE, CUSTOMER } from '../constants/constants.js'; // import constants

// signup for customers
export const signup = async (req, res) => {
	try {
		const {
			mobileNo,
			firstName,
			lastName,
			address,
			email, // TODO: check???
			confirmPassword,
			password,
		} = req.body; // get email and password, mobileNo, first_name, last_name from request body

		// check if user exist
		const userExist = await User.findOne({ where: { mobileNo } });
		if (userExist) {
			return res.status(400).json({ message: 'User already exist' }); // return error
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Password and Confirm Password do not match' }); // return error
		}
		// create user
		const user = await User.create({
			mobileNo,
			email,
			firstName,
			lastName,
			password,
			role: CUSTOMER,
			status: ACTIVE,
		});

		// create customer
		await Customer.create({
			userId: user.userId,
			address,
		});

		return res.status(201).json({ message: 'Signup successful', user }); // return user data if success 
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message }); // return error if error
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

		// generate encoded access token and refresh token
		const accessToken = generateToken(user, ACCESS);
		const refreshToken = generateToken(user.userId, REFRESH);

		const decodedRefreshToken = verifyToken(refreshToken, REFRESH); // decode refresh token to get expiration date of refresh token in UNIX timestamp format (seconds since Jan 1, 1970) 
		// The decodedRefreshToken.exp property represents the expiration time of the token in UNIX timestamp format. By multiplying it by 1000 and passing it to the Date constructor, we convert it to a Date object representing the expiration date of the refresh token.
		const refreshTokenExpiration = new Date(decodedRefreshToken.exp * 1000); // get expiration date of refresh token

		// save refresh token in db 
		await RefreshToken.storeRefreshToken(user.userId, refreshToken, refreshTokenExpiration); // store refresh token in db

		res.cookie('refreshToken', refreshToken, { // set refresh token in cookie 
			httpOnly: true, // httpOnly: true means that the cookie is not accessible from JavaScript. This is a security measure to prevent cross-site scripting (XSS) attacks.
			path: '/api/auth/refresh-token', // path: '/api/auth/refresh-token' means that the cookie is only sent to the /api/auth/refresh-token endpoint.
			sameSite: 'strict' // sameSite: 'strict' means that the cookie is only sent in requests to the same domain as the one in the address bar of the browser. This prevents the browser from sending the cookie along with cross-site requests.
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
		const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}` // create url for fetching user info from google
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

// for refreshing access token
export const refreshToken = async (req, res) => {
	try {
		const { refreshToken } = req.cookies; // get refresh token from cookies 

		// Check if the refresh token exists
		if (!refreshToken) {
			return res.status(401).json({ message: 'Refresh token not found' }); // return error
		}

		// Verify the refresh token 
		// object destructuring to get user from decoded refresh token
		const { id } = verifyToken(refreshToken, REFRESH);   // verify refresh token and get user data from it

		// Check if the refresh token is valid
		const isValid = await RefreshToken.isValidToken(id, refreshToken); // check if refresh token is valid in db 

		switch (isValid) {
			case VALID:
				// Generate new access token
				const user = await User.findOne({ where: { id } }); // get user from db
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
		const userId = req.user.userId;

		// Delete the refresh token from the database 
		await RefreshToken.destroy({ where: { userId } });

		// Clear the cookie containing the refresh token
		res.clearCookie('refreshToken');

		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// change password
export const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword } = req.body; // get old password and new password from request body
		const { id } = req.user; // get user id from authenticated user

		const user = await User.findOne({ where: { id } }); // get user from db

		// check if old password is correct
		if (!(await user.isValidPassword(oldPassword))) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// update password
		user.password = newPassword;
		await user.save();

		return res.status(200).json({ message: 'Password changed successfully' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { firstName, lastName, email, mobileNo } = req.body; // get first name, last name, email from request body
		const { id } = req.user; // get user id from authenticated user

		const user = await User.findOne({ where: { id } }); // get user from db

		// update user
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.mobileNo = mobileNo;
		await user.save();

		return res.status(200).json({ message: 'Profile updated successfully' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}