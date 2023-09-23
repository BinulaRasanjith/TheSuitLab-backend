import { Router } from "express";

import { sendOTP, verifyOTP } from "../controllers/otpController.js";

const router = Router();


router.post("/send", sendOTP);
router.post("/verify", verifyOTP);

export default router;