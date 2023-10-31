import { Router } from "express";

import {
  addNewAccessory,
  getAccessories,
  getAccessoryById,
  removeAccessory,
  updateAccessory,
  addAccessoryToCart,
} from "../controllers/accessoryController.js";
import { accessoryImageUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.get("/", getAccessories);
router.get("/:type/:id", getAccessoryById);
router.post("/add", accessoryImageUpload.array("images", 10), addNewAccessory);
router.post("/remove", removeAccessory);
router.post("/update", updateAccessory);
router.post("/add-accessory-to-cart", addAccessoryToCart);

export default router;
