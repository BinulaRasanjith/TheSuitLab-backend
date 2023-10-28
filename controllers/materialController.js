import { Transaction } from "sequelize";
import Material from "../models/MaterialModel.js";
import Buttons from "../models/ButtonModel.js";
import Fabric from "../models/FabricModel.js";
import Interlining from "../models/InterliningModel.js";
import Strings from "../models/StringModel.js";
import Zipper from "../models/ZipperModel.js";
import sequelize from "../db/db.js";

// VIEW ALL MATERIALS
export const getMaterials = async (req, res) => {
    try {
        const { type } = req.body;

        let materials;
        if (type) { // IF TYPE IS SPECIFIED
            materials = await Material.findAll({ where: { materialType: type } });
        } else { // IF TYPE IS NOT SPECIFIED
            materials = await Material.findAll();
        }

        return res.status(200).json({ materials });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// ADD NEW MATERIAL
export const addMaterial = async (req, res) => {
    try {
        const { materialType, materialName, supplier, unitPrice, color, colorCode, image } = req.body;

        // const materialExist = await Material.findOne({ where: { materialCode } });
        const materialExist = await Material.findOne({
            where: {
                materialName: materialName,
            }
        });

        if (materialExist) {
            return res.status(409).json({ message: "Material already exists" });
        }

        const material = await Material.create({
            materialType,
            materialName,
            supplier,
            unitPrice,
            color,
            colorCode,
            image,
        });

        const thisMaterial = await Material.findOne({
            order: [['createdAt', 'DESC']] // ASSUMING 'CREATEDAT' IS A TIMESTAMP FIELD
        });

        if (accessoryType === "button") {
            const { quantity, size } = req.body;
            const button = await Buttons.create({
                materialCode: thisMaterial.materialCode,
                quantity,
                size,
            });
            return res.status(201).json({ material, button });
        }

        if (accessoryType === "fabric") {
            const { quantity, pattern } = req.body;
            const fabric = await Fabric.create({
                materialCode: thisMaterial.materialCode,
                quantity,
                pattern,
            });
            return res.status(201).json({ material, fabric });
        }

        if (accessoryType === "interlining") {
            const { quantity, weightOfUnit } = req.body;
            const interlining = await Interlining.create({
                materialCode: thisMaterial.materialCode,
                quantity,
                weightOfUnit,
            });
            return res.status(201).json({ material, interlining });
        }

        if (accessoryType === "string") {
            const { quantity, size } = req.body;
            const string = await Strings.create({
                materialCode: thisMaterial.materialCode,
                quantity,
                size,
            });
            return res.status(201).json({ material, string });
        }

        if (accessoryType === "zipper") {
            const { quantity, style, size } = req.body;
            const zipper = await Zipper.create({
                materialCode: thisMaterial.materialCode,
                quantity,
                style,
                size,
            });
            return res.status(201).json({ material, zipper });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// REMOVE ENTIRE MATERIAL
export const removeMaterial = async (req, res) => {
    try {
        const { materialCode } = req.body;

        // CHECK IF MATERIAL EXISTS
        const material = await Material.findOne({ where: { materialCode } });
        if (!material) { // IF MATERIAL DOES NOT EXIST
            return res.status(404).json({ message: "Material not found" });
        }

        await Material.destroy({ where: { materialCode } });
        return res.status(200).json({ message: "Material deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// TODO: test this
// MATERIAL QUANTITY UPDATE USING A TRANSACTION WHEN STOCK IS ADDED
export const addMaterialQuantity = async (req, res) => {
    // STARTING A TRANSACTION
    let transaction;
    try {
        transaction = await sequelize.transaction({
            // ISOLATION LEVEL IS SET TO SERIALIZABLE (BECAUSE WE ARE DEALING WITH QUANTITY)
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });

        const { material_id, quantity } = req.body;
        const material = await Material.findOne({
            where: { materialCode: material_id },
            transaction,
        });
        console.log(req.body);

        if (!material) { // IF MATERIAL DOES NOT EXIST
            return res.status(404).json({ message: "Material not found" });
        }

        // UPDATE MATERIAL QUANTITY
        const newQuantity = material.quantity + quantity;
        await Material.update(
            { quantity: newQuantity },
            { where: { materialCode: material_id } },
            { transaction }
        );

        await transaction.commit(); // COMMIT THE TRANSACTION
        return res.status(200).json({ message: "Material quantity updated" });
    } catch (error) {
        // IF TRANSACTION EXISTS, ROLLBACK THE TRANSACTION
        if (transaction) await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
}

// TODO: test this
// MATERIAL QUANTITY UPDATE USING A TRANSACTION WHEN STOCK IS USED
export const useMaterialQuantity = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction({
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });

        const { materialCode, quantity } = req.body;
        const material = await Material.findOne({
            where: { materialCode },
            transaction,
        });

        if (!material) {
            return res.status(404).json({ message: "Material not found" });
        }

        const newQuantity = material.quantity - quantity;
        await Material.update(
            { quantity: newQuantity },
            { where: { materialCode } },
            { transaction }
        );

        await transaction.commit();
        return res.status(200).json({ message: "Material quantity updated" });
    } catch (error) {
        if (transaction) await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
}