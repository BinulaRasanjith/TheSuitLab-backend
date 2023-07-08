import { Router } from "express"; // for creating router
import {
    signup,
    login,
    googleLogin,
    logout,
    refreshToken,
    getUsers,
} from "../controllers/authControllers.js"; // for routing
import { authJWT } from "../middlewares/authUser.js"; // for authenticating user

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/logout', authJWT, logout);
router.get('/refresh-token', refreshToken);
router.get('/get-all', authJWT, getUsers);

export default router;