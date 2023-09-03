import Material from "../models/MaterialModel.js";
import Payment from "../models/PaymentModel.js";
import Order from "../models/CostumeOrderModel.js";

import Button from "../models/ButtonModel.js";
import Fabric from "../models/FabricModel.js";
import Strings from "../models/StringModel.js";
import Interlining from "../models/InterliningModel.js";
import Zipper from "../models/ZipperModel.js";

import { Op } from "sequelize";


export const getLowStockMaterialCount = async (req, res) => {
    try {
        const lowStockMaterials = 0;

        const lowStockButtons = await Button.count({ where: { quantity: { [Op.lt]: 50 } } }); // 50 PIECES
        const lowStockFabrics = await Fabric.count({ where: { quantity: { [Op.lt]: 25 } } }); // 25 METERS (1 ROLL)
        const lowStockStirngs = await Strings.count({ where: { quantity: { [Op.lt]: 2500 } } }); // 2500 METERS (10 ROLLS)
        const lowStockInterlinings = await Interlining.count({ where: { quantity: { [Op.lt]: 20 } } }); // 20 PIECES
        const lowStockZippers = await Zipper.count({ where: { quantity: { [Op.lt]: 20 } } }); // 20 METERS

        lowStockMaterials = lowStockButtons + lowStockFabrics + lowStockStirngs + lowStockInterlinings + lowStockZippers;

        return res.status(200).json({ lowStockMaterials });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

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