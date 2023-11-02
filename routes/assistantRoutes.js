import { Router } from "express";

// import { authUserRole, authJWT } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN } from "../constants/constants.js";

import { dashboardData } from "../controllers/dashboardController.js";
import { removeItem, recentOrders } from "../controllers/assistantController.js";

const router = Router();
// const allowedRoles = [ OPERATION_ASSISTANT ];

router.get("/", dashboardData); // ! ASSISTANT DASHBOARD RUNS USING THIS ENDPOINT
router.get("/recent-orders", recentOrders);
router.delete("/remove-item", removeItem);

export default router;