import { Router } from "express";

import { authUserRole, authJWT } from "../middlewares/authUser.js";
import { OPERATION_ASSISTANT } from "../constants/constants.js";

import { addReturn, getReturns,updateReturn,removeReturn } from "../controllers/returnController.js";

const router = Router();

// ONLY ALLOWED FOR OPERATION ASSISTANT
const allowedRoles = [ OPERATION_ASSISTANT ];

router.get("/", authJWT, authUserRole(allowedRoles), getReturns);
router.get("/:id", authJWT, authUserRole(allowedRoles), getReturns);
router.post("/", authJWT, authUserRole(allowedRoles), addReturn);
router.put("/", authJWT, authUserRole(allowedRoles), updateReturn);
router.delete("/:id", authJWT, authUserRole(allowedRoles), removeReturn);

export default router;