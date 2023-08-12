import { Router } from 'express'; // for creating router
import authRoutes from './authRoutes.js'; // for routing to auth endpoints
import userRoutes from './userRoutes.js'; // for routing to user endpoints

const router = Router(); // for creating router

router.use('/auth', authRoutes); // for routing
router.use('/user', userRoutes); // for routing

export default router;