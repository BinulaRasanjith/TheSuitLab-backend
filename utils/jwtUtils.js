import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const generateToken = (id, tokenType) => {
    let secret, expiresIn;
    switch (tokenType) {
        case "ACCESS":
            secret = process.env.ACCESS_TOKEN_SECRET;
            expiresIn = process.env.JWT_ACCESS_EXPIRE;
            break;
        case "REFRESH":
            secret = process.env.REFRESH_TOKEN_SECRET;
            expiresIn = process.env.JWT_REFRESH_EXPIRE;
            break;
        default:
            throw new Error("Invalid token type");
    }

    return jwt.sign({ user: { id } }, secret, { expiresIn });
};

export const verifyToken = (token, tokenType) => {
    let secret;
    switch (tokenType) { // check token type
        case "ACCESS":
            secret = process.env.ACCESS_TOKEN_SECRET; 
            break;
        case "REFRESH":
            secret = process.env.REFRESH_TOKEN_SECRET;  
            break;
        default:
            throw new Error("Invalid token type");
    }
    return jwt.verify(token, secret); // return decoded token
}