import { Router } from "express";
import {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  getPrice,
  updateToCollected,
  getCustomersPurchaseOrders,
  assignTailor,
  getAssignedTailorForCostume,
} from "../controllers/purchaseOrderController.js";

const router = Router();

router.get("/customer/:customerId", getCustomersPurchaseOrders);
router.get("/", getPurchaseOrders);
router.get("/:orderId", getPurchaseOrder);
router.patch("/to-collected", updateToCollected)
router.post("/", createPurchaseOrder);
router.post("/get-price", getPrice);
router.post("/assign-tailor", assignTailor);
router.get("/get-assigned-tailor/:itemId", getAssignedTailorForCostume);

export default router;