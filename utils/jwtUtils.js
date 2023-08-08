import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { ACCESS, REFRESH } from "../constants/constants.js";

dotenv.config();

export const generateToken = (id, tokenType) => { // generate token
    let secret, expiresIn; // declare secret and expiresIn variables
    switch (tokenType) { // check token type
        case ACCESS: // if access token
            secret = process.env.ACCESS_TOKEN_SECRET; // set secret to access token secret
            expiresIn = process.env.JWT_ACCESS_EXPIRE; // set expiresIn to access token expire
            break;
        case REFRESH:
            secret = process.env.REFRESH_TOKEN_SECRET;
            expiresIn = process.env.JWT_REFRESH_EXPIRE;
            break;
        default:
            throw new Error("Invalid token type"); // throw error if token type is invalid
    }

    return jwt.sign({ user: { id } }, secret, { expiresIn }); // return encoded token 
};

export const verifyToken = (token, tokenType) => { // verify token  
    let secret;
    switch (tokenType) { // check token type
        case ACCESS:
            secret = process.env.ACCESS_TOKEN_SECRET;
            break;
        case REFRESH:
            secret = process.env.REFRESH_TOKEN_SECRET;
            break;
        default:
            throw new Error("Invalid token type");
    }
     // return decoded token
    return jwt.verify(token, secret); // verify token and return the payload 
}