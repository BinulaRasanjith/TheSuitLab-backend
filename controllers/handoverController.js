// import { HireCostume, Handover, Rent, User } from "../model/models.js";
import Handover from "../models/HandoverModel.js";
import HireCostume from "../models/HireCostumesModel.js";
import Rent from "../models/RentModel.js";
import User from "../models/UserModel.js";
import Customer from "../models/CustomerModel.js";

import { Op } from "sequelize";

// HAND-OVERING FUNCTION
export const handoverCostume = async (req, res) => {
    try {
        const {
            rentalId,
            costume,
            damages,
            balance,
            penalties,
            total,
        } = req.body;

        const requestedCostume = await HireCostume.findOne({ where: { itemId: costume, } });

        if (!requestedCostume) {
            return res.status(404).json({ message: "Requested costume could not be found!" });
        } else {
            // SETTING THE STATUS OF THE COSTUME TO AVAILABLE
            requestedCostume.rentStatus = 'Available';
            await requestedCostume.save();

            // ADDING THE HANDOVER RECORD
            await Handover.create({
                rentalId: rentalId,
                costumeId: costume,
                handoveredTo: req.user.name,
                damages: damages,
                balance: balance,
                penalties: penalties,
                total: total,
            });
        }

        res.status(201).json({ message: "Handovered successfully!" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// RENTED ITEMS DISPLAYING FUNCTION
export const getHiredItems = async (req, res) => {
    try {

        const { id } = req.params;
        const today = new Date();

        const notHandovered = await Rent.findAll({
            where: {
                willHandover: { [Op.gte]: today },
            },
            include: [
                {
                    model: Customer,
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName',],
                        },
                    ],
                    attributes: ['userId', ]
                },
            ],
            attributes: ['rentalId', 'costume', 'rentedDate', 'willHandover', 'mobileNo'],
        });

        res.status(200).json(notHandovered);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// HANDOVER CANCELLING FUNCTION (REMOVE FROM HANDOVERS TABLE AS WELL AS SET THE STATUS OF THE COSTUME TO NOT-AVAILABLE)
export const cancelHandover = async (req, res) => {
    try {
        const { id, costume } = req.body;

        const requestedHandover = await Handovers.findOne({ where: { rentalId: id, } });
        if (!requestedHandover) {
            return res.status(404).json({ message: "Requested handover could not be found!" });
        }

        // SETTING THE STATUS OF THE COSTUME TO NOT-AVAILABLE
        const requestedHire = await HireCostumes.findOne({ where: { itemId: costume, } });
        requestedHire.rentStatus = 'Hired';
        await requestedHire.save();

        // DELETING THE HANDOVER RECORD
        await Handovers.destroy({ where: { rentalId: id, } });

        return res.status(200).json({ message: "Return record deleted" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// UPDATING FUNCTION // TODO: DO THIS NEEDED? CZ UPDATION SAME TO THE CANCLE HANDOVER
export const updateHandover = async (req, res) => {
    try {
        const { id } = req.params; // ASSUMING YOU PASS THE RETURN ID IN THE URL
        const { damages } = req.body;

        // FIND THE RETURN BY ID
        const requestedHandover = await Handovers.findByPk(id);

        if (!requestedHandover) {
            return res.status(404).json({ message: "Handover not found" });
        }

        // UPDATE THE REASON FIELD
        requestedHandover.damages = damages;
        await requestedHandover.save();

        res.status(200).json(requestedHandover);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}