import { Router } from "express";

import { dashboardData } from "../controllers/dashboardController.js";

const router = Router();

router.get("", dashboardData);

export default router;