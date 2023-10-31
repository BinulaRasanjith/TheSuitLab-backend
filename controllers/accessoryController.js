// import { Transaction } from "sequelize";
// import Accessory from "../models/AccessoryModel.js";
// import ItemModel from "../models/ItemModel.js";
// import Belt from "../models/BeltModel.js";
// import Shoe from "../models/ShoeModel.js";
// import Tie from "../models/TieModel.js";
import sequelize from "../db/db.js";
import {
  Cart,
  ItemModel,
  Accessory,
  Belt,
  Shoe,
  Tie,
} from "../models/models.js";
// import { QueryTypes } from "sequelize";

export const addNewAccessory = async (req, res) => {
  try {
    const { brand, itemName, material, color, price, accessoryType } = req.body;

    // const accessoryExist = await Accessory.findOne({ where: { itemId } });
    const accessoryExist = await Accessory.findOne({
      where: {
        itemName: itemName,
      },
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
      order: [["createdAt", "DESC"]], // ASSUMING 'CREATEDAT' IS A TIMESTAMP FIELD
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
};

export const getAccessories = async (req, res) => {
  try {
    const { accessoryType } = req.query;
    let accessories;

    if (accessoryType) {
      accessories = await Accessory.findAll({
        where: {
          accessoryType,
        },
      });

      const accJson = await Promise.all(
        accessories.map(async (accessory) => {
          const item = await ItemModel.findOne({
            where: {
              itemId: accessory.itemId,
            },
          });
          const ret = {
            itemId: accessory.itemId,
            itemName: accessory.itemName,
            image: accessory.image,
            brand: accessory.brand,
            price: item.price,
            status: item.status,
          };
          return ret;
        })
      );

      res.status(200).json(accJson);
    } else {
      accessories = await Accessory.findAll();
      res.status(200).json(accessories);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAccessoryById = async (req, res) => {
  try {
    const { type, id } = req.params;
    const accessory = await Accessory.findOne({ where: { itemId: id } });
    const item = await ItemModel.findOne({ where: { itemId: id } });
    if (type === "belts") {
      const belt = await Belt.findOne({ where: { itemId: id } });
      if (accessory && item && belt) {
        return res.status(200).json({
          ...accessory.toJSON(),
          ...item.toJSON(),
          ...belt.toJSON(),
        });
      } else {
        return res.status(404).json({ message: "Accessory not found" });
      }
    } else if (type === "ties") {
      const tie = await Tie.findOne({ where: { itemId: id } });
      if (accessory && item && tie) {
        return res.status(200).json({
          ...accessory.toJSON(),
          ...item.toJSON(),
          ...tie.toJSON(),
        });
      } else {
        return res.status(404).json({ message: "Accessory not found" });
      }
    } else if (type === "shoes") {
      const shoe = await Shoe.findOne({ where: { itemId: id } });
      if (accessory && item && shoe) {
        return res.status(200).json({
          ...accessory.toJSON(),
          ...item.toJSON(),
          ...shoe.toJSON(),
        });
      } else {
        return res.status(404).json({ message: "Accessory not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
};

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
};

export const addAccessoryToCart = async (req, res) => {
  try {
    const { customerId, itemId, price, quantity, status, description } =
      req.body;

    const cartItem = new Cart({
      customerId,
      itemId,
      price,
      quantity,
      status,
      description,
    });

    console.log(cartItem.toJSON());
    await cartItem.save();

    res.status(201).json({ message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
