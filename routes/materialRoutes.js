import { Router } from "express";

import {
    addMaterial,
    addMaterialQuantity,
    getMaterials,
    removeMaterial,
    useMaterialQuantity,
} from "../controllers/materialController.js";
import { materialImageUpload } from "../middlewares/imageUpload.js";

const router = Router();

router.get("/", getMaterials);
router.post("/", materialImageUpload.single("image"), addMaterial);
router.put("/add", addMaterialQuantity);
router.put("/use", useMaterialQuantity);
router.delete("/", removeMaterial);

export default router;