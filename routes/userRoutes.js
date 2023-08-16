import { Router } from "express";

import { authUserRole } from "../middlewares/authUser.js";
import { ADMIN } from "../constants/constants.js";
import { addUser, getUsers } from "../controllers/userController.js";

const router = Router();

router.post("/add-user", upload.single("image"), addUser);
router.post("/get-users", getUsers);
import { addUser } from "../controllers/userController.js";
import upload from "../middlewares/imageUpload.js";
// router.post("/add-user", addUser);

export default router;