import passport from "../config/passport.js";

export const authJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user && info && info.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        // If access token is expired, 
        if (info && info.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized', accessTokenExpired: true });
        }

        req.user = user;
        next();
    })(req, res, next);
};

export const authUserRole = (allowedRoles) => {
    return (req, res, next) => {
        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden" });
        }
    }
};
