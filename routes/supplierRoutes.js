import { Router } from "express";

import {
    createSupplier,
    deleteSupplier,
    getSupplier,
    getSuppliers,
    updateSupplier,
} from "../controllers/supplierController.js";

const router = Router();

router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.post("/", createSupplier);
router.patch("/", updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;
