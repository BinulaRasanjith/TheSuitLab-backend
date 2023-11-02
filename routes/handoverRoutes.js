import { Router } from "express";

// import { authJWT, authUserRole } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT } from "../constants/constants.js";
import { handoverCostume, getHiredItems, cancelHandover, updateHandover } from "../controllers/handoverController.js";

const router = Router();

// const allowedRoles = [ OPERATION_ASSISTANT ];

router.post("/", handoverCostume);
router.get("/", getHiredItems);
router.put("/", updateHandover);
router.delete("/:id", cancelHandover);

export default router;