import { Router } from "express";
import {
  getPreDesignedCostumes,
  getPreDesignedCostumeById,
} from "../controllers/preDesignedCostumeController.js";

const router = Router();

router.get("/", getPreDesignedCostumes);
router.get("/:id", getPreDesignedCostumeById);

export default router;
