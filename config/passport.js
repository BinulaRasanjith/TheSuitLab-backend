import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/models.js";

dotenv.config();

const options = {
    // jwtFromRequest: (req) => {
    //     let token = null;
    //     if (req && req.cookies) {
    //         token = req.cookies.accessToken;
    //     }
    //     return token;
    // },
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET || "access-token-secret",
};

const verifyUser = async (payload, done) => {
    try {
        const user = await User.findOne({ where: { userId: payload.user.userId } });
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