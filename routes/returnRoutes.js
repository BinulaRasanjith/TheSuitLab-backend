import { Router } from "express";

// import { authUserRole } from "../middlewares/authUser.js";
// import { ADMIN } from "../constants/constants.js";
import { addReturn } from "../controllers/returnController.js";

const router = Router();

router.post("/add-return", addReturn);
// router.post("/get-returns", getUsers);

export default router;