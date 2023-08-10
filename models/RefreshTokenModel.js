import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import { VALID, INVALID, EXPIRED } from "../constants/constants.js";

const RefreshToken = sequelize.define( // define model
    "RefreshToken", // model name
    {
        token: { // define columns
            type: DataTypes.STRING, // set data type
            allowNull: true, // set allowNull
        },
        expiresAt: { // define columns
            type: DataTypes.DATE, // set data type
            allowNull: true, // set allowNull
        },
    },
    {
        tableName: "refresh_tokens", // explicitly set table name
        timestamps: false // disable createdAt and updatedAt for this model 
    }
);

// To validate the refresh token
RefreshToken.isValidToken = async (userId, refreshToken) => {
    const refreshTokenInstance = await RefreshToken.findOne({ // Find the refresh token in the database using the user ID and the refresh token 
        where: {
            user_id: userId,
            token: refreshToken,
        },
    });

    if (refreshTokenInstance) {
        // Check if the refresh token is still valid
        const currentDateTime = new Date(); // Get the current date and time
        const refreshTokenExpiration = new Date(refreshTokenInstance.expiresAt); // Get the refresh token expiration date and time

        if (currentDateTime < refreshTokenExpiration) { // Check if the current date and time is less than the refresh token expiration date and time
            return VALID; // Refresh token is valid
        } else {
            return EXPIRED; // Refresh token has expired
        }
    }
    return INVALID; // Refresh token is invalid or not found
};



// To store the refresh token
RefreshToken.storeRefreshToken = async (userId, refreshToken, refreshTokenExpiration) => {
    try {
        // Check if there is an existing refresh token for the user
        let existingToken = await RefreshToken.findOne({ where: { userId } });

        if (existingToken) {
            // Update the existing refresh token with the new one and the new expiration date of the new refresh token 
            existingToken.token = refreshToken; // Set the new refresh token
            existingToken.expiresAt = refreshTokenExpiration; // Set the new expiration date
            await existingToken.save(); // Save the changes
        } else {
            await RefreshToken.create({ // create new refresh token
                userId, // set user id
                token: refreshToken, // set refresh token
                expiresAt: refreshTokenExpiration, // set expiration date
            });
        }
    } catch (error) { // catch error if there is an error in storing the refresh token
        console.log(error);
        throw new Error('Failed to store refresh token');
    }
};

export default RefreshToken;
