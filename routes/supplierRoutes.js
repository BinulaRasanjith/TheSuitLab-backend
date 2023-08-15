import { Router } from "express";

import {
    createSupplier,
    deleteSupplier,
    getSupplier,
    getSuppliers, updateSupplier,
} from "../controllers/supplierController";

const router = Router();

router.post("/create", createSupplier);
router.get("/get", getSuppliers);
router.get("/get/:id", getSupplier);
router.patch("/update", updateSupplier);
router.delete("/delete/:id", deleteSupplier);

export default router;