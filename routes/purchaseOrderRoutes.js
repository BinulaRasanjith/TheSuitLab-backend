import { Router } from "express";
import {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  getPrice,
  updateToCollected,
  getCustomersPurchaseOrders,
} from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/customer/:customerId", getCustomersPurchaseOrders);
router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.patch("/to-collected", updateToCollected)
router.post("/", createPurchaseOrder);
router.post("/get-price", getPrice);

export default router;