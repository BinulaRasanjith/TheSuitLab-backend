import { Router } from "express";

import {
    addNewCostume,
    getCostumes,
    getCostumeById,
    removeCostume,
    updateCostume,
    // sellCostume,
    // customCostume,
} from "../controllers/accessoryController.js";
import { accessoryImageUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.get("/", getAccessories);
router.get("/:id", getAccessory);
router.post("/add", accessoryImageUpload.array("images", 10), addNewAccessory);
router.post("/remove", removeAccessory);
router.post("/update", updateAccessory);

export default router;