import { Router } from "express";

import { authUserRole } from "../middlewares/authUser.js";
import { ADMIN } from "../constants/constants.js";
import { addUser, getUsers } from "../controllers/userController.js";
import upload from "../middlewares/imageUpload.js";

const router = Router();

router.post("/add-user", upload.single("image"), addUser);
router.post("/get-users", getUsers);

export default router;