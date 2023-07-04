import { Router } from "express";
import {
    signup,
    login,
    refreshToken,
    getUsers,
} from "../controllers/authControllers.js";
import { authJWT } from "../utils/authUser.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh-token', refreshToken);
router.get('/get-all', authJWT, getUsers);

export default router;