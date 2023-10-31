import { Router } from "express";

import {
    addNewAccessory,
    getAccessories,
    getAccessory,
    removeAccessory,
    updateAccessory,
} from "../controllers/accessoryController.js";
import { accessoryImagesUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.get("/", getAccessories);
router.get("/:id", getAccessory);
// router.post("/add", accessoryImagesUpload.array("image", 10), addNewAccessory);
router.post("/add", accessoryImagesUpload.single("image"), addNewAccessory);
router.post("/remove", removeAccessory);
router.post("/update", updateAccessory);

export default router;