import { Router } from "express";
import {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  getPrice,
  getCustomersPurchaseOrders,
} from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/customer/:customerId", getCustomersPurchaseOrders);
router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.post("/", createPurchaseOrder);
router.post("/get-price", getPrice);

export default router;
