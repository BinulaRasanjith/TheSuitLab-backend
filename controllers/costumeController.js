// import { Transaction } from "sequelize";
import Costume from "../models/CostumeModel.js";
import CostumeOrder from "../models/CostumeOrderModel.js";

export const addNewCostume = async (req, res) => {
    try {
        const { costumeName, customization, measurements, costumeType, designType, rentalPrice, salePrice, image } = req.body;

        // const costumeExist = await Costume.findOne({ where: { costumeId } });
        const costumeExist = await Costume.findOne({
            where: {
                costumeName: costumeName,
            }
        });

        if (costumeExist) {
            return res.status(409).json({ message: "Costume already exists" });
        }

        const imageFiles = req.files.map((file) => file.originalname);

        const costume = await Costume.create({
            costumeName,
            customization,
            measurements,
            costumeType,
            designType,
            rentalPrice,
            salePrice,
            image: imageFiles,
        });

        return res.status(201).json({ costume });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getCostumes = async (req, res) => {
    try {
        const costumes = await Costume.findAll();
        res.status(200).json(costumes);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

export const getCostume = async (req, res) => {
    try {
        const { costumeId } = req.params;
        const costume = await Costume.findOne({ where: { costumeId } });
        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }
        return res.status(200).json(costume);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const removeCostume = async (req, res) => {
    try {
        const { costumeId } = req.body;

        const costume = await Costume.findOne({ where: { costumeId } });
        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }

        await Costume.destroy({ where: { costumeId } });
        return res.status(200).json({ message: "Costume deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateCostume = async (req, res) => {
    try {
        const { costumeId } = req.params;
        const { costumeName, customization, measurements, costumeType, designType, rentalPrice, salePrice, image } = req.body;

        const costume = await Costume.findOne({ where: { costumeId } });

        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }

        const updatedCostume = await Costume.update(
            {
                costumeName,
                customization,
                measurements,
                costumeType,
                designType,
                rentalPrice,
                salePrice,
                image: imageFiles,
            },
            { where: { costumeId } }
        );

        return res.status(200).json({ message: "Costume updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const sellCostume = async (req, res) => {
    try {
        const { costumeId, customerId, quantity, total } = req.body;

        const costume = await Costume.findOne({ where: { costumeId } });
        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }

        const costumeOrder = await CostumeOrder.create({
            costumeId,
            customerId,
            quantity,
            total,
        });

        return res.status(201).json({ costumeOrder });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}