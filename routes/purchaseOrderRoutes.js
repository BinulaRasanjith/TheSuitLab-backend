import { Router } from "express";
import { getPurchaseOrders } from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/", getPurchaseOrders);

export default router;
