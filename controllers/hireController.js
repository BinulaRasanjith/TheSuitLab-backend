import Hires from "../models/RentModel.js";
import HireCostume from "../models/HireCostumesModel.js";
import User from "../models/UserModel.js";

import { Op } from "sequelize";

// CREATING NEW HIRE
export const newHire = async (req, res) => {
    try {
        const {
            customer,
            costume,
            willHandover,
            advance,
            mobile,
        } = req.body;

        // GET THE RENTAL PRICE FROM HIRE COSTUME MODEL
        const rental = await HireCostume.findOne({
            where: {
                itemId: costume,
            }
        });

        // GET THE CUSTOMER MOBILE NUMBER FROM USER MODEL IF NOT GIVEN
        if (mobile == null) {
            const customerMobile = await User.findOne({
                where: {
                    userId: customer,
                }
            });
        }

        const HandoverDate = new Date(willHandover);
        const currentDate = new Date();

        const timeDifference = HandoverDate.getTime() - currentDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        const price = daysDifference * (rental.price) + 250.00;

        const handoveredObject = await Hires.create({
            customerId: customer,
            costume: costume,
            willHandover: willHandover,
            price: price,
            advance: advance,
            mobileNo: mobile,
        });

        res.status(201).json(handoveredObject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// RENTED ITEM LISTING FUNCTION
export const getHiredItems = async (req, res) => {
    try {

        const { id } = req.params;

        const hiredItems = await Hires.findAll({

            // ? SEARCH BY CUSTOMER ID
            // where: {
            //     customerId: {
            //         [Op.like]: `%${id}%`,
            //     }
            // }

            // ? SEARCH BY ENYTHING
            where: {
                [Op.or]: [
                    {
                        customerId: {
                            [Op.like]: `%${id}%`,
                        }
                    },
                    {
                        costume: {
                            [Op.like]: `%${id}%`,
                        }
                    },
                    {
                        mobileNo: {
                            [Op.like]: `%${id}%`,
                        }
                    }
                ]
            }
        });
        res.status(200).json(hiredItems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// REMOVING FUNCTION
export const cancelHire = async (req, res) => {
    try {
        const { id } = req.body;

        const found = await Hires.findOne({ where: { rentalId: id, } });
        if (!found) {
            return res.status(404).json({ message: "Requested suit not found!" });
        }

        await Hires.destroy({ where: { rentalId: id, } });
        return res.status(200).json({ message: "Record deleted" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// UPDATING FUNCTION
export const updateHire = async (req, res) => {
    try {
        // const { id } = req.params; // Assuming you pass the return ID in the URL
        const { id, customer, costume, advance, willHandover, mobile } = req.body;

        // FIND THE RETURN BY ID
        const requestedHire = await Hires.findByPk(id); // TODO: CHECK THIS UPDATE OR NOT

        if (!requestedHire) {
            return res.status(404).json({ message: "Return not found" });
        }

        // UPDATE THE FIELDS IF THEY ARE PROVIDED IN THE REQUEST BODY
        if (customer) {
            requestedHire.customerId = customer;
        }
        if (costume) {
            requestedHire.costume = costume;
        }
        if (willHandover) {
            requestedHire.willHandover = willHandover;
        }
        if (advance) {
            requestedHire.advance = advance;
        }
        if (mobile) {
            requestedHire.mobileNo = mobile;
        }

        // SAVE THE UPDATED RECORD TO THE DATABASE
        await requestedHire.save();

        res.status(200).json({ message: `Successfully updated!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}