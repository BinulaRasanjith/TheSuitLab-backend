import {
  getHireCostumes,
  getHireCostumeById,
  addHireCostume,
  updateHireCostume,
  removeHireCostume,
  retrieveHireCostumeById,
} from "../controllers/hireCostumesController.js";
import { Router } from "express";

const router = Router();

router.get("/", getHireCostumes);
router.get("/:id", retrieveHireCostumeById);
router.post("/", addHireCostume);
router.put("/", updateHireCostume);
router.delete("/:id", removeHireCostume);

export default router;
