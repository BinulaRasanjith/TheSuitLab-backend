import User from "./UserModel.js";
import RefreshToken from "./RefreshTokenModel.js";

// Associations
User.hasOne(RefreshToken, { foreignKey: 'userId' }); // 1:1 relationship

export { // for exporting
    User,
    RefreshToken,
};