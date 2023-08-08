import { Router } from "express"; // for creating router
import { 
    signup,
    login,
    googleLogin,
    logout,
    refreshToken,
    getUsers,
} from "../controllers/authControllers.js"; // for routing to auth endpoints and for handling requests to auth endpoints 
import { authJWT } from "../middlewares/authUser.js"; // for authenticating user using JWT 

const router = Router(); // for creating router

router.post('/signup', signup); // for routing to auth endpoints and for handling requests to auth endpoints 
router.post('/login', login);
router.post('/google-login', googleLogin);
router.post('/logout', authJWT, logout);
router.get('/refresh-token', refreshToken);
router.get('/get-all', authJWT, getUsers);

export default router;