import { Router } from 'express'; // for creating router
import authRoutes from './authRoutes.js'; // for routing to auth endpoints
import materialRoutes from './materialRoutes.js'; // for routing to material endpoints
import userRoutes from './userRoutes.js'; // for routing to user endpoints
import supplierRouter from './supplierRoutes.js';
import returnRouter from './returnRoutes.js';

const router = Router(); // for creating router

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/materials', materialRoutes);
router.use('/suppliers', supplierRouter);
router.use('/returns', returnRouter);

export default router;