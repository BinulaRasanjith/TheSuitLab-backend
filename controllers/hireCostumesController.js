import HireCostume from "../models/AccessoryModel.js";
import ItemModel from "../models/BeltModel.js";
import Shoe from "../models/ShoeModel.js";
import Tie from "../models/TieModel.js";

export const getHireCostumes = async (req, res) => {
    try {
        const { costumeType, rentStatus } = req.query;
        let hireCostumes;
        if (costumeType || available) {
            hireCostumes = await HireCostume.findAll({
                where: {
                    costumeType,
                    rentStatus,
                },
            });
        } else {
            hireCostumes = await HireCostume.findAll();
        }

        res.status(200).json(hireCostumes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getHireCostumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const hireCostume = await HireCostume.findOne({
            where: { hireCostumeId: id },
        });

        const itemModel = await ItemModel.findOne({
            where: { itemId: id },
        });

        if (hireCostume) {
            res.status(200).json({ ...hireCostume.toJSON(), ...itemModel.toJSON() });
        } else {
            res.status(404).json({ message: "Hire costume not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addHireCostume = async (req, res) => {
    try {
        const {
            costumeName,
            costumeType,
            size,
            color,
            fabric,
            price,
            buttons,
            buttonColor,

            lapel,
            pockets,
            pocketColor,
            sleeveButton,

            vent,
            backPocket,
        } = req.body;

        const imageFiles = req.files.map((file) => file.originalname);

        const returnObj = await HireCostume.create({
            name: costumeName,
            costumeType: costumeType,
            size: size,
            color: color,
            fabric: fabric,
            price: price,
            lapel: lapel,
            pockets: pockets,
            pocketColor: pocketColor,
            sleeveButton: sleeveButton,
            buttons: buttons,
            buttonColor: buttonColor,
            vent: vent,
            backPocket: backPocket,

            images: imageFiles,
        });

        res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHireCostume = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        const hireCostume = await HireCostume.findOne({
            where: { itemId: id },
        });

        // const itemModel = await ItemModel.findOne({
        //     where: { itemId: id },
        // });

        // if (hireCostume && itemModel) {
        //     res.status(200).json({ ...hireCostume.toJSON(), ...itemModel.toJSON() });
        // } else {
        //     res.status(404).json({ message: "Hire costume not found" });
        // }

        if (!(hireCostume)) {
            res.status(404).json({ message: "Costume not found!" });
        }

        // TRY TO UPDATE THE COSTUME
        if (await HireCostume.update(updatedFields)) {
            res.status(200).json({ message: "Costume details updated successfully!" });
        } else {
            res.status(404).json({ message: "Update failed!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error!" });
    }
};

export const removeHireCostume = async (req, res) => {
    try {
        const { id } = req.params;

        const hireCostume = await HireCostume.findOne({
            where: { itemId: id },
        });
        if (!hireCostume) {
            res.status(404).json({ message: "Costume not found!" });
        } else {
            const deletedRows = await HireCostume.destroy({
                where: { itemId: id, },
            });
            if (deletedRows) {
                res.status(200).json({ message: "Costume data deleted!" });
            } else {
                res.status(404).json({ message: "Deletion unsuccessful!" });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error! Code:${error}` });
    }
};