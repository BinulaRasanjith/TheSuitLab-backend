import {Router} from 'express'; // for creating router
const router = Router(); // for creating router

import authRoutes from './authRoutes.js'; // for routing to auth endpoints
router.use('/auth', authRoutes); // for routing

export default router;