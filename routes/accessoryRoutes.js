import { Router } from "express";

import {
    addNewAccessory,
    getAccessories,
    getAccessory,
    removeAccessory,
    updateAccessory,
    // addMaterialQuantity,
    // useMaterialQuantity,
} from "../controllers/accessoryController.js";
import { accessoryImageUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.get("/", getAccessories);
router.get("/:id", getAccessory);
router.post("/add", accessoryImageUpload.array("images", 10), addNewAccessory);
router.post("/remove", removeAccessory);
router.post("/update", updateAccessory);

// router.patch("/add-quantity", addMaterialQuantity);
// router.patch("/use-quantity", useMaterialQuantity);

export default router;