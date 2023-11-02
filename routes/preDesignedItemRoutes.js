import { Router } from "express";
import {
  getPreDesignedCostumes,
  getPreDesignedCostumeById,
  retrievePreDesignedCostumes,
} from "../controllers/preDesignedCostumeController.js";

const router = Router();

router.get("/", getPreDesignedCostumes);
router.get("/:id", getPreDesignedCostumeById);
router.get("/recent-designs", retrievePreDesignedCostumes);

export default router;
