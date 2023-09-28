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
router.post("/add", materialImageUpload.single("image"), addMaterial);
router.post("/remove", removeMaterial);
router.patch("/add-quantity", addMaterialQuantity);
router.patch("/use-quantity", useMaterialQuantity);

export default router;