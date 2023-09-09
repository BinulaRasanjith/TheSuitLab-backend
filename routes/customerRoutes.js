import { Router } from "express";

import { authUserRole, authJWT } from "../middlewares/authUser.js";
// import { ADMIN } from "../constants/constants.js";
import { setCoatMeasurements, setCartItem, getCartItems } from "../controllers/customerController.js";

const router = Router();

// '/customers'
router.post("/set-coat-measurements", setCoatMeasurements);
router.post("/add-to-cart", authJWT, setCartItem);
router.get("/get-cart-items", authJWT, getCartItems);

export default router;