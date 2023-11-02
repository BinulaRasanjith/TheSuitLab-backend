import { Router } from "express";

import { authJWT, authUserRole } from "../middlewares/authUser.js";
import { OPERATION_ASSISTANT } from "../constants/constants.js";
import { newHire, getHiredItems, cancelHire, updateHire } from "../controllers/hireController.js";

const router = Router();

// const allowedRoles = [ OPERATION_ASSISTANT ];

router.post("/", newHire);
router.get("/", getHiredItems);
router.put("/", updateHire);
router.delete("/:id", cancelHire);

export default router;