import { Router } from "express";

import { 
    getLowStockMaterialCount, 
    getProcessingOrderCount, 
    getOrderCount, 
    incomeTotal, 
    getRecentOrders,
    getWeeklyPerformance, 
} from "../controllers/dashboardController.js";

const router = Router();

router.get("/", getLowStockMaterialCount);

// router.get("/", getLowStockMaterialCount);
// router.get("/", getProcessingOrderCount);
// router.get("/", getOrderCount);
// router.get("/", incomeTotal);
// router.get("/", getRecentOrders);
// router.get("/", getWeeklyPerformance);

export default router;