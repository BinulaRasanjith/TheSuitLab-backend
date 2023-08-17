import { Router } from "express";

// import { authUserRole } from "../middlewares/authUser.js";
// import { ADMIN } from "../constants/constants.js";
import { addReturn, getReturns } from "../controllers/returnController.js";

const router = Router();

router.post("/add-return", addReturn);
router.get("/get-returns", getReturns);
// router.post("/get-returns", getUsers);

export default router;