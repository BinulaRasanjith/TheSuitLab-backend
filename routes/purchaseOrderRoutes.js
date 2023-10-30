import { Router } from "express";
import {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  getPrice,
} from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.post("/", createPurchaseOrder);
router.post("/get-price", getPrice);

export default router;
