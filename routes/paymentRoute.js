import { Router } from "express";

import { notifyPaymentDone, startPayment } from "../controllers/paymentController.js";

const router = Router();

// /api/payment/
router.get("/start", startPayment);
router.post("/notify/:paymentDoneId", notifyPaymentDone);

export default router;