import { Router } from "express";

import { authUserRole, authJWT } from "../middlewares/authUser.js";
import { OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN } from "../constants/constants.js";

import {
    calculateProcessingOrderCount,
    calculateLowStockMaterialCount,
    calculateOrderCount,
    findIncomeTotal,
    getRecentOrders,
    getWeeklyPerformance,
} from "../controllers/odbController.js";

const router = Router();

const allowedRoles = [ OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN ];

router.get("/cpoc", authJWT, authUserRole(allowedRoles), calculateProcessingOrderCount);
router.get("/clmc", authJWT, authUserRole(allowedRoles), calculateLowStockMaterialCount);
router.get("/coc", authJWT, authUserRole(allowedRoles), calculateOrderCount);
router.get("/cit", authJWT, authUserRole(allowedRoles), findIncomeTotal);
router.get("/gro", authJWT, authUserRole(allowedRoles), getRecentOrders);
router.get("/gwp", authJWT, authUserRole(allowedRoles), getWeeklyPerformance);

export default router;