import { Router } from "express";

import { dashboardData, getPrManagerDashboardData } from "../controllers/dashboardController.js";

const router = Router();

// TO GET DASHBOARD DATA USING SINGLE ENDPOINT
// TODO: IF THIS FILE IS USING PLEASE REMEMBER TO REMOVE odbRoutes FROM routes/routes.js
router.get("/", dashboardData);
router.get("/manager", getPrManagerDashboardData);

export default router;