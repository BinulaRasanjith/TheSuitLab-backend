import { Router } from "express";

// import { authUserRole } from "../middlewares/authUser.js";
// import { ADMIN } from "../constants/constants.js";
import { setCoatMeasurements } from "../controllers/customerController.js";

const router = Router();

// '/customers'
router.post("/set-coat-measurements", setCoatMeasurements);

export default router;