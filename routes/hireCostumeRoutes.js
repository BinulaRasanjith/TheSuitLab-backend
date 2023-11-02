import {
  getHireCostumes,
  getHireCostumes2,
  getHireCostumeById,
  addHireCostume,
  updateHireCostume,
  removeHireCostume,
  // retrieveHireCostumeById,
} from "../controllers/hireCostumesController.js";
import { Router } from "express";

const router = Router();

router.get("/", getHireCostumes);
// router.get("/:id", retrieveHireCostumeById);
router.get("/all", getHireCostumes2);
router.get("/:id", getHireCostumeById);
router.post("/", addHireCostume);
router.put("/", updateHireCostume);
router.delete("/:id", removeHireCostume);

export default router;
