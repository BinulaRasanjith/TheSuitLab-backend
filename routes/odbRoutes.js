import { Router } from "express";

import {

    calculateProcessingOrderCount,
    calculateLowStockMaterialCount,
    calculateOrderCount,
    findIncomeTotal,
    getRecentOrders,
    getWeeklyPerformance,

} from "../controllers/odbController.js";

const router = Router();

router.get("/cpoc", calculateProcessingOrderCount);
router.get("/clmc", calculateLowStockMaterialCount);
router.get("/coc", calculateOrderCount);
router.get("/cit", findIncomeTotal);
router.get("/gro", getRecentOrders);
router.get("/gwp", getWeeklyPerformance);

export default router;