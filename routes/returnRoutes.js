import { Router } from "express";

// import { authUserRole, authJWT } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT } from "../constants/constants.js";

import { addReturn, getReturns,updateReturn,removeReturn } from "../controllers/returnController.js";

const router = Router();

// ONLY ALLOWED FOR OPERATION ASSISTANT
// const allowedRoles = [ OPERATION_ASSISTANT ];

router.get("/", getReturns);
router.get("/:id", getReturns);
router.post("/", addReturn);
router.put("/", updateReturn);
router.delete("/:id", removeReturn);

export default router;