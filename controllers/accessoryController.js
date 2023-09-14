// import { Transaction } from "sequelize";
import Accessory from "../models/AccessoryModel.js";
import Belt from "../models/BeltModel.js";
import Shoe from "../models/ShoeModel.js";
import Tie from "../models/TieModel.js";

export const addNewAccessory = async (req, res) => {
    try {
        const { brand, itemName, material, color, price, accessoryType } = req.body;

        // const accessoryExist = await Accessory.findOne({ where: { itemId } });
        const accessoryExist = await Accessory.findOne({
            where: { 
                itemName: itemName,
            }
        });

        if (accessoryExist) {
            return res.status(409).json({ message: "Accessory already exists" });
        }

        const imageFiles = req.files.map((file) => file.originalname);

        const accessory = await Accessory.create({
            brand,
            itemName,
            material,
            color,
            price,
            accessoryType,
            image: imageFiles,
        });

        // const itemId = await Accessory.findOne({ where: { itemName } });
        const thisItem = await Accessory.findOne({
            order: [['createdAt', 'DESC']] // ASSUMING 'CREATEDAT' IS A TIMESTAMP FIELD
        });

        if (accessoryType === "belt") {
            const { buckleType, size } = req.body;
            const belt = await Belt.create({
                itemId: thisItem.itemId,
                buckleType,
                size,
            });
            return res.status(201).json({ accessory, belt });
        }

        if (accessoryType === "shoe") {
            const { style, size } = req.body;
            const shoe = await Shoe.create({
                itemId: thisItem.itemId,
                style,
                size,
            });
            return res.status(201).json({ accessory, shoe });
        }

        if (accessoryType === "tie") {
            const { pattern, width } = req.body;
            const tie = await Tie.create({
                itemId: thisItem.itemId,
                pattern,
                width,
            });
            return res.status(201).json({ accessory, tie });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const getAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.findAll();
        res.status(200).json(accessories);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

export const getAccessory = async (req, res) => {
    try {
        const { itemId } = req.params;
        const accessory = await Accessory.findOne({ where: { itemId } });
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }
        return res.status(200).json(accessory);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const removeAccessory = async (req, res) => {
    try {
        const { itemId } = req.body;

        const accessory = await Accessory.findOne({ where: { itemId } });
        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        await Accessory.destroy({ where: { itemId } });
        return res.status(200).json({ message: "Accessory deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateAccessory = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { brand, itemName, material, color, price, type, image } = req.body;

        const accessory = await Accessory.findOne({ where: { itemId } });

        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        const updatedAccessory = await Accessory.update(
            {
                brand,
                itemName,
                material,
                color,
                price,
                type,
                image,
            },
            { where: { itemId } }
        );

        return res.status(200).json({ message: "Accessory updated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}