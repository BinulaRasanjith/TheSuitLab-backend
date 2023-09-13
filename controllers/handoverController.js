import Hires from "../models/HireCostumesModel.js";
import Handovers from "../models/HandoverModel.js";

import { Op } from "sequelize";

// ADDING FUNCTION
export const handoverCostume = async (req, res) => {
    try {
        const {
            costumeId,
            handoveredTo,
            damages,
            balance,
            penalties,
            total
        } = req.body;

        const handoveredObject = await Return.create({
            costumeId,
            handoveredTo,
            damages,
            balance,
            penalties,
            total
        });

        res.status(201).json(handoveredObject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// RENTED ITEM LISTING FUNCTION
export const getHiredItems = async (req, res) => {
    try {

        const { find } = req.body;

        const returns = await Hires.findAll({
            where: {
                status: 'status',
                [Op.or]: [
                    { status: 'Hired' },
                    { hireCostumeId: find }
                ]
            }
        });
        res.status(200).json(returns);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// REMOVING FUNCTION
export const cancelHandover = async (req, res) => {
    try {
        const { referenceNo } = req.body;

        const returnsuit = await Return.findOne({ where: { referenceNo } });
        if (!returnsuit) {
            return res.status(404).json({ message: "Returned suit not found" });
        }

        await Return.destroy({ where: { referenceNo } });
        return res.status(200).json({ message: "Return record deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// UPDATING FUNCTION
export const updateReturn = async (req, res) => {
    try {
        const { referenceNo } = req.params; // Assuming you pass the return ID in the URL
        const { reason } = req.body;

        // Find the return by ID
        const returnObj = await Return.findByPk(referenceNo);

        if (!returnObj) {
            return res.status(404).json({ message: "Return not found" });
        }

        // Update the reason field
        returnObj.reason = reason;
        await returnObj.save();

        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}