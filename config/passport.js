import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { User } from "../models/index.js";

dotenv.config();

const options = {
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies.accessToken;
        }
        return token;
    },
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const verifyUser = async (payload, done) => {
    try {
        const user = await User.findByPk(payload.user.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}

const jwtStrategy = new JwtStrategy(options, verifyUser);

passport.use(jwtStrategy);

export default passport;