import { Router } from "express";

// import { authJWT, authUserRole } from "../middlewares/authUser.js";
// import { OPERATION_ASSISTANT } from "../constants/constants.js";
import { addReturn, getReturns, removeReturn, updateReturn } from "../controllers/returnController.js";

const router = Router();

// const allowedRoles = [ OPERATION_ASSISTANT ];

router.post("/", addReturn);
router.get("/", getReturns);
router.put("/", updateReturn);
router.delete("/:id", removeReturn);

export default router;