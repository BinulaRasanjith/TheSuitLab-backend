import { Router } from 'express'; // for creating router

import authRoutes from './authRoutes.js'; // for routing to auth endpoints
import materialRoutes from './materialRoutes.js'; // for routing to material endpoints
import userRoutes from './userRoutes.js'; // for routing to user endpoints
import supplierRoutes from './supplierRoutes.js';
import returnRoutes from './returnRoutes.js';
import handoverRoutes from './handoverRoutes.js';
import customerRoutes from './customerRoutes.js';
import smsRoutes from './smsRoutes.js';
import dashboardRoutes from './dashboardRoutes.js'; // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE

// import { dashboardData } from '../controllers/dashboardController.js';


const router = Router(); // for creating router

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/materials', materialRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/returns', returnRoutes);
router.use('/hiring', handoverRoutes);
router.use('/customers', customerRoutes);
router.use('/notify', smsRoutes);
router.use('/dashboard', dashboardRoutes); // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE

// router.get('/dashboard', dashboardData);

export default router;