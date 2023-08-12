import { Router } from "express";

import { authUserRole } from "../middlewares/authUser.js";
import { ADMIN } from "../constants/constants.js";
import { addUser } from "../controllers/userController.js";

const router = Router();

router.post("/add-user", addUser);

export default router;