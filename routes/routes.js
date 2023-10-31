import { Router } from "express"; // for creating router

import authRoutes from "./authRoutes.js"; // for routing to auth endpoints
import otpRoutes from "./otpRoutes.js"; // for routing to otp endpoints
import materialRoutes from "./materialRoutes.js"; // for routing to material endpoints
import userRoutes from "./userRoutes.js"; // for routing to user endpoints
import supplierRoutes from "./supplierRoutes.js";
import returnRoutes from "./returnRoutes.js";
import handoverRoutes from "./handoverRoutes.js";
import customerRoutes from "./customerRoutes.js";
import smsRoutes from "./smsRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js"; // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE
import odbRoutes from "./odbRoutes.js"; // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE
import hireCostumesRoutes from "./hireCostumeRoutes.js";
import purchaseOrderRoutes from "./purchaseOrderRoutes.js";
import { dashboardData } from "../controllers/dashboardController.js";
import paymentRoute from "./paymentRoute.js";
import reviewRoutes from "./reviewRoutes.js";

const router = Router(); // for creating router

router.use("/auth", authRoutes);
router.use("/otp", otpRoutes);
router.use("/user", userRoutes);
router.use("/material", materialRoutes);
router.use("/supplier", supplierRoutes);
router.use("/returns", returnRoutes);
router.use("/hiring", handoverRoutes);
router.use("/customer", customerRoutes);
router.use("/notify", smsRoutes);
router.use("/dashboard", dashboardRoutes); // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE
router.use("/odb", odbRoutes); // TODO: IF USING DASHBOARD, UNCOMMENT THIS LINE
router.use("/costume-hiring", hireCostumesRoutes);
router.use("/payment", paymentRoute);
router.use("/purchase-order", purchaseOrderRoutes);
router.use("/review", reviewRoutes);

router.get("/assistant", dashboardData);

export default router;
