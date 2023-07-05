import {Router} from 'express'; // for creating router
import authRoutes from './authRoutes.js'; // for routing
const router = Router(); // for creating router

router.use('/auth', authRoutes); // for routing

export default router;