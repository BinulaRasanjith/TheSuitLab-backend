import { Router } from "express";
import {
  getPurchaseOrders,
  getPurchaseOrder,
  getPrice,
} from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.patch("/to-collected", updateToCollected)
router.post("/get-price", getPrice);

export default router;
