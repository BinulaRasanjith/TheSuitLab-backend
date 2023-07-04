import User from "./UserModel.js";
import RefreshToken from "./RefreshTokenModel.js";

// Associations
User.hasOne(RefreshToken, { foreignKey: 'userId' });

export {
    User,
    RefreshToken,
};