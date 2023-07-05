import { Router } from "express"; // for creating router
import {
    signup,
    login,
    refreshToken,
    getUsers,
} from "../controllers/authControllers.js"; // for routing
import { authJWT } from "../middlewares/authUser.js"; // for authenticating user

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.get('/get-all', authJWT, getUsers);

export default router;