import { getHireCostumes, getHireCostumeById } from "../controllers/hireCostumesController.js";
import { Router } from "express";

const router = Router();

router.get("/", getHireCostumes);
router.get("/:id", getHireCostumeById);

export default router;