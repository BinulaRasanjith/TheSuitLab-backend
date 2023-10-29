import { Router } from "express";

import { authUserRole } from "../middlewares/authUser.js";
import { ADMIN } from "../constants/constants.js";
import { addUser, getUsers, addNewCustomer } from "../controllers/userController.js";
import { profilePicUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.post("/add-user", profilePicUpload.single("image"), addUser);
router.post("/get-users", getUsers);

router.post("/add-customer", addNewCustomer);

export default router;