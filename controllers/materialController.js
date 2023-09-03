import { Transaction } from "sequelize";
import Material from "../models/MaterialModel.js";

export const getMaterials = async (req, res) => {
    try {
        const { type } = req.body;

        let materials;
        if (type) { // if type is specified
            materials = await Material.findAll({ where: { materialType: type } });
        } else { // if type is not specified
            materials = await Material.findAll();
        }

        return res.status(200).json({ materials });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const addMaterial = async (req, res) => {
    try {
        const { materialCode, type, color, colorCode, quantity, usedQuantity } = req.body;

        const materialExist = await Material.findOne({ where: { materialCode } });

        if (materialExist) {
            return res.status(409).json({ message: "Material already exists" });
        }

        const material = await Material.create({
            materialCode,
            type,
            color,
            colorCode,
            quantity,
            usedQuantity,
        });
        return res.status(201).json({ material });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const removeMaterial = async (req, res) => {
    try {
        const { materialCode } = req.body;

        // check if material exists
        const material = await Material.findOne({ where: { materialCode } });
        if (!material) { // if material does not exist
            return res.status(404).json({ message: "Material not found" });
        }

        await Material.destroy({ where: { materialCode } });
        return res.status(200).json({ message: "Material deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// TODO: test this
export const addMaterialQuantity = async (req, res) => {
    // starting a transaction
    let transaction;
    try {
        transaction = await sequelize.transaction({
            // isolation level is set to SERIALIZABLE (BECAUSE WE ARE DEALING WITH QUANTITY)
            isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });

        const { materialCode, quantity } = req.body;
        const material = await Material.findOne({
            where: { materialCode },
            transaction,
        });

        if (!material) { // if material does not exist
            return res.status(404).json({ message: "Material not found" });
        }

        // update material quantity
        const newQuantity = material.quantity + quantity;
        await Material.update(
            { quantity: newQuantity },
            { where: { materialCode } },
            { transaction }
        );

        await transaction.commit(); // commit the transaction
        return res.status(200).json({ message: "Material quantity updated" });
    } catch (error) {
        // if transaction exists, rollback the transaction
        if (transaction) await transaction.rollback();
        return res.status(500).json({ message: error.message });
    }
}

// TODO: test this
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