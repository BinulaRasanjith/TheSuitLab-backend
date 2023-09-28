import { Router } from "express";

// import { authUserRole } from "../middlewares/authUser.js";
// import { ADMIN } from "../constants/constants.js";
import { addReturn, getReturns,updateReturn,removeReturn } from "../controllers/returnController.js";

const router = Router();

router.get("/get-returns", getReturns);
router.post("/add-return", addReturn);
router.post("/update-return", updateReturn);
router.delete("/remove-return/:id", removeReturn);

export default router;