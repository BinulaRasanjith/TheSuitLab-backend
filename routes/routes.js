import { Router } from 'express'; // for creating router
import authRoutes from './authRoutes.js'; // for routing to auth endpoints
import materialRoutes from './materialRoutes.js'; // for routing to material endpoints

const router = Router(); // for creating router

router.use('/auth', authRoutes);
router.use('/materials', materialRoutes);

export default router;