import { Router } from "express";

import { authUserRole, authJWT } from "../middlewares/authUser.js";
import {
  setCoatMeasurements,
  setTrouserMeasurements,
  getCoatMeasurements,
  getTrouserMeasurements,
  setCartItemForCustomSuit,
  getCartItems,
  setCartItemForHireCostume,
  setNewCostumeToItemModel,
  removeCartItem,
  paymentInfo,
  setPaymentInfo,
  getCustomers,
} from "../controllers/customerController.js";

const router = Router();

// /api/customer
router.get("/details", getCustomers);
router.post("/set-coat-measurements", authJWT, setCoatMeasurements);
router.post("/set-trouser-measurements", authJWT, setTrouserMeasurements);
router.get("/coat-measurements/:userId", getCoatMeasurements);
router.get("/trouser-measurements/:userId", getTrouserMeasurements);
router.post("/add-hire-costume-to-cart", authJWT, setCartItemForHireCostume);
router.post("/add-custom-suit-to-cart", authJWT, setCartItemForCustomSuit);
router.get("/cart", authJWT, getCartItems);
router.post(
  "/add-new-costume-to-item-model",
  authJWT,
  setNewCostumeToItemModel
);
router.delete("/remove-cart-item/:id", authJWT, removeCartItem);
router.get("/payment-info", authJWT, paymentInfo);
router.post("/set-payment-info", authJWT, setPaymentInfo);

export default router;