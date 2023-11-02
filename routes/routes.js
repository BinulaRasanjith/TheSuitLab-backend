import { Router } from "express"; // for creating router

import authRoutes from "./authRoutes.js"; // for routing to auth endpoints
import accessoryRoutes from "./accessoryRoutes.js";
import assistantRoutes from "./assistantRoutes.js";
import otpRoutes from "./otpRoutes.js"; // for routing to otp endpoints
import materialRoutes from "./materialRoutes.js"; // for routing to material endpoints
import userRoutes from "./userRoutes.js"; // for routing to user endpoints
import supplierRoutes from "./supplierRoutes.js";
import returnRoutes from "./returnRoutes.js";
import handoverRoutes from "./handoverRoutes.js";
import customerRoutes from "./customerRoutes.js";
import smsRoutes from "./smsRoutes.js";
import hireCostumesRoutes from "./hireCostumeRoutes.js";
import purchaseOrderRoutes from "./purchaseOrderRoutes.js";
import paymentRoute from "./paymentRoute.js";
import rentalRoutes from "./rentalRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import preDesignedItemRoutes from "./preDesignedItemRoutes.js";
import notificationRoutes from "./notificationRoutes.js"; // for routing to notification endpoints

const router = Router(); // for creating router

router.use("/auth", authRoutes);
router.use("/accessory", accessoryRoutes);
router.use("/assistant", assistantRoutes);
router.use("/otp", otpRoutes);
router.use("/user", userRoutes);
router.use("/material", materialRoutes);
router.use("/supplier", supplierRoutes);
router.use("/returns", returnRoutes);
router.use("/hiring", rentalRoutes);
router.use("/handover", handoverRoutes);
router.use("/customer", customerRoutes);
router.use("/notify", smsRoutes);
router.use("/costume-hiring", hireCostumesRoutes);
router.use("/payment", paymentRoute);
router.use("/purchase-order", purchaseOrderRoutes);
router.use("/accessories", accessoryRoutes);
router.use("/review", reviewRoutes);
router.use("/pre-designed-costumes", preDesignedItemRoutes);
router.use("/notification", notificationRoutes);

export default router;
