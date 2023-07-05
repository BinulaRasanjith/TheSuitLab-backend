import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RefreshToken = sequelize.define(
    "RefreshToken",
    {
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "refresh_tokens",
        timestamps: false
    }
);

// To validate the refresh token
RefreshToken.isValidToken = async (userId, refreshToken) => {
    const refreshTokenInstance = await RefreshToken.findOne({
        where: {
            userId,
            token: refreshToken,
        },
    });

    if (refreshTokenInstance) {
        // Check if the refresh token is still valid
        const currentDateTime = new Date();
        const refreshTokenExpiration = new Date(refreshTokenInstance.expiresAt);

        if (currentDateTime < refreshTokenExpiration) {
            return 'VALID'; // Refresh token is valid
        } else {
            return 'EXPIRED'; // Refresh token has expired
        }
    }
    return 'INVALID'; // Refresh token is invalid or not found
};

RefreshToken.storeRefreshToken = async (userId, refreshToken, refreshTokenExpiration) => {
    try {
        // Check if there is an existing refresh token for the user
        let existingToken = await RefreshToken.findOne({ where: { userId } });

        if (existingToken) {
            // Update the existing refresh token
            existingToken.token = refreshToken;
            existingToken.expiresAt = refreshTokenExpiration; // Set the new expiration date
            await existingToken.save();
        } else {
            // Create a new refresh token
            await RefreshToken.create({
                userId,
                token: refreshToken,
                expiresAt: refreshTokenExpiration,
            });
        }
    } catch (error) {
        throw new Error('Failed to store refresh token');
    }
};

export default RefreshToken;
