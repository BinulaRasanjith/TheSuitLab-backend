import { Router } from "express";
import { getPurchaseOrders, getPurchaseOrder, updateToCollected } from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.patch("/to-collected", updateToCollected)

export default router;
