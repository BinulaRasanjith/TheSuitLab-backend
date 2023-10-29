// ! ASSISTANT DASHBOARD RUNS USING THIS ENDPOINT
import { Router } from "express";

// import { authUserRole, authJWT } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT, PRODUCT_MANAGER, TAILOR, ADMIN } from "../constants/constants.js";

import { dashboardData } from "../controllers/dashboardController.js";

const router = Router();
// const allowedRoles = [ OPERATION_ASSISTANT ];

router.get("/", dashboardData);

export default router;