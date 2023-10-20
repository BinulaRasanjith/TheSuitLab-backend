import { Router } from "express";
import { getPurchaseOrders, getPurchaseOrder } from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);

export default router;
