import { Router } from "express";

import {
    addMaterial,
    addMaterialQuantity,
    getMaterials,
    removeMaterial,
    useMaterialQuantity,
} from "../controllers/materialController.js";

const router = Router();

router.post("/", getMaterials);
router.post("/add", addMaterial);
router.post("/remove", removeMaterial);
router.post("/add-quantity", addMaterialQuantity);
router.post("/use-quantity", useMaterialQuantity);

export default router;