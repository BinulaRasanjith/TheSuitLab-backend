import { Router } from "express";

import { authJWT, authUserRole } from "../middlewares/authUser.js";
import { OPERATION_ASSISTANT } from "../constants/constants.js";
import { addReturn, getReturns, removeReturn, updateReturn } from "../controllers/returnController.js";

const router = Router();

const allowedRoles = [ OPERATION_ASSISTANT ];

router.post("/", authJWT, authUserRole(allowedRoles), addReturn);
router.get("/", authJWT, authUserRole(allowedRoles), getReturns);
router.put("/", authJWT, authUserRole(allowedRoles), updateReturn);
router.delete("/:id", authJWT, authUserRole(allowedRoles), removeReturn);

export default router;