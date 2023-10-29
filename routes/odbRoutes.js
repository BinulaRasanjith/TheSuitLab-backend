import { Router } from "express";

// import { authUserRole, authJWT } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN } from "../constants/constants.js";

import {
    calculateProcessingOrderCount,
    calculateLowStockMaterialCount,
    calculateOrderCount,
    findIncomeTotal,
    getRecentOrders,
    getWeeklyPerformance,
} from "../controllers/odbController.js";

const router = Router();

// const allowedRoles = [ OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN ];

router.get("/cpoc", calculateProcessingOrderCount);
router.get("/clmc", calculateLowStockMaterialCount);
router.get("/coc", calculateOrderCount);
router.get("/cit", findIncomeTotal);
router.get("/gro", getRecentOrders);
router.get("/gwp", getWeeklyPerformance);

export default router;