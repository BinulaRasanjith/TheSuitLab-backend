import Material from "../models/MaterialModel.js";
import Payment from "../models/PaymentModel.js";
import CostumeOrder from "../models/CostumeOrderModel.js";

import Button from "../models/ButtonModel.js";
import Fabric from "../models/FabricModel.js";
import Strings from "../models/StringModel.js";
import Interlining from "../models/InterliningModel.js";
import Zipper from "../models/ZipperModel.js";

import { Op } from "sequelize";

// TO GET LOW STOCK MATERIAL COUNT FROM ALL MATERIALS
export const getLowStockMaterialCount = async (req, res) => {
    try {
        const lowStockMaterials = 0; // INITIAL VALUE

        const lowStockButtons = await Button.count({ where: { quantity: { [Op.lt]: 50 } } });           // LIMIT: 50 PIECES
        const lowStockFabrics = await Fabric.count({ where: { quantity: { [Op.lt]: 25 } } });           // LIMIT: 25 METERS (1 ROLL)
        const lowStockStirngs = await Strings.count({ where: { quantity: { [Op.lt]: 2500 } } });        // LIMIT: 2500 METERS (10 ROLLS)
        const lowStockInterlinings = await Interlining.count({ where: { quantity: { [Op.lt]: 20 } } }); // LIMIT: 20 PIECES
        const lowStockZippers = await Zipper.count({ where: { quantity: { [Op.lt]: 20 } } });           // LIMIT: 20 METERS

        // CALCULATE TOTAL LOW STOCK MATERIAL COUNT
        lowStockMaterials = lowStockButtons + lowStockFabrics + lowStockStirngs + lowStockInterlinings + lowStockZippers;

        return res.status(200).json({ lowStockMaterials }); // SEND COUNT AS RESPONSE
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


// TO GET CURRENTLY PROCESSING ORDER COUNT // TODO: NOT COMPLETED YET
export const getProcessingOrderCount = async (req, res) => {
    try {

        const thisWeekProcessingCount = await Button.count({ where: { quantity: { [Op.lt]: 50 } } }); // ? CHECK THIS WEEK ONGOING COUNT
        const lastWeekProcessingCount = await Button.count({ where: { quantity: { [Op.lt]: 50 } } }); // ? CHECK LAST WEEK ONGOING COUNT

        // TODO: GET THE PRECENTAGE OF INCREASE OR DECREASE OF ORDERS
        return res.status(200).json({ thisWeekProcessingCount, lastWeekProcessingCount }); // SEND THIS WEEK AND LAST WEEK COUNTS AS RESPONSE

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


// TO GET WEEKLY ORDER COUNT
export const getOrderCount = async (req, res) => {
    try {

        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        // CALCULATING WEEKLY ORDERS
        const thisWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        const orderPresentage = (thisWeekOrderCount - lastWeekOrderCount) / lastWeekOrderCount * 100;

        return res.status(200).json({ thisWeekOrderCount, lastWeekOrderCount, orderPresentage}); // SEND CALCULATED VALUES AS RESPONSE

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: error.message });

    }
}


// TO GET WEEKLY INCOME
export const incomeTotal = async (req, res) => {
    try {

        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        const thisWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        const orderPresentage = (thisWeekOrderCount - lastWeekOrderCount) / lastWeekOrderCount * 100;

        return res.status(200).json({ thisWeekOrderCount, lastWeekOrderCount, orderPresentage});

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: error.message });

    }
}


// TO SHOW RECENT COSTUME ORDERS
export const getRecentOrders = async (req, res) => {
    try {

        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        const thisWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        const orderPresentage = (thisWeekOrderCount - lastWeekOrderCount) / lastWeekOrderCount * 100;

        return res.status(200).json({ thisWeekOrderCount, lastWeekOrderCount, orderPresentage});

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: error.message });

    }
}


// TO SHOW WEEKLY PERFOMANCE USING CHART
export const getWeeklyPerformance = async (req, res) => {
    try {

        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        const thisWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekOrderCount = await CostumeOrder.count({ where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        const orderPresentage = (thisWeekOrderCount - lastWeekOrderCount) / lastWeekOrderCount * 100;

        return res.status(200).json({ thisWeekOrderCount, lastWeekOrderCount, orderPresentage});

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: error.message });

    }
}