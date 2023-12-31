// import Payment from "../models/PaymentModel.js";
// import PurchaseOrder from "../models/PurchaseOrderModel.js";

// import Button from "../models/ButtonModel.js";
// import Fabric from "../models/FabricModel.js";
// import Strings from "../models/StringModel.js";
// import Interlining from "../models/InterliningModel.js";
// import Zipper from "../models/ZipperModel.js";

import { Fabric, Strings, Interlining, Zipper, Payment, PurchaseOrder, Customer, Costume } from "../models/models.js";

import { Op } from "sequelize";
import moment from "moment";
import PurchaseOrderStatus from "../constants/PurchaseOrderStatus.js";
import CostumeProgress from "../constants/CostumeProgress.js";


// INITIAL FUNCTION WHICH IS CALLED FROM ROUTES
export const dashboardData = async (req, res) => {
    try {
        const lowStockMaterials = await calculateLowStockMaterialCount();
        const processingOrders = await calculateProcessingOrderCount();
        const orderCount = await calculateOrderCount();
        const income = await findIncomeTotal();
        const recentOrders = await getRecentOrders();
        const weeklyPerformance = await getWeeklyPerformance();

        return res.status(200).json({ lowStockMaterials, processingOrders, orderCount, income, recentOrders, weeklyPerformance });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const getPrManagerDashboardData = async (req, res) => {
    try {
        const customerCount = await Customer.count();
        // PLACED, PROCESSING, COMPLETED ORDERS COUNT
        const placedOrdersCount = await PurchaseOrder.count({ where: { status: PurchaseOrderStatus.PLACED } });
        const processingOrdersCount = await Costume.count({ where: { progress: CostumeProgress.PROCESSING } });
        const completedOrdersCount = await PurchaseOrder.count({ where: { status: PurchaseOrderStatus.COMPLETED } });

        const orderCount = placedOrdersCount + processingOrdersCount + completedOrdersCount;

        const income = await findIncomeTotal();

        return res.status(200).json({ customerCount, orderCount, processingOrdersCount, income });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};


// CURRENTLY PROCESSING ORDER COUNT CALCULATING FUNCTION - LOCALLY CALLING (WORKING)
const calculateProcessingOrderCount = async () => {
    try {
        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();

        // CALCULATING THIS WEEK PROCESSING ORDERS AND PERCENTAGE
        const processingCount = await PurchaseOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, },} });
        // const totalCount = await PurchaseOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const totalCount = await PurchaseOrder.getItemModels({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        let percentageChange;

        if(processingCount && totalCount) {
            percentageChange = processingCount / totalCount * 100;
        } else {
            percentageChange = 0;
        }

        const result = {
            processingCount: processingCount,
            totalCount: totalCount,
            percentageChange: percentageChange.toFixed(2),
        };
        return result; // SEND CORRECTLY CALCULATED VALUES TO THE INITIAL FUNCTION

    } catch (error) {
        console.log(error);
        const result = {
            processingCount: 0,
            totalCount: 0,
            percentageChange: 0.00,
        };
        return result; // SEND 0s WHEN ERROR OCCURS
    }
}


// LOW STOCK MATERIAL COUNT CALCULATING FUNCTION - LOCALLY CALLING (WORKING)
const calculateLowStockMaterialCount = async () => {
    try {
        const lowStockButtons = await Button.count({ where: { quantity: { [Op.lt]: 50 } } });           // LIMIT: 50 PIECES
        const lowStockFabrics = await Fabric.count({ where: { quantity: { [Op.lt]: 25 } } });           // LIMIT: 25 METERS (1 ROLL)
        const lowStockStirngs = await Strings.count({ where: { quantity: { [Op.lt]: 2500 } } });        // LIMIT: 2500 METERS (10 ROLLS)
        const lowStockInterlinings = await Interlining.count({ where: { quantity: { [Op.lt]: 20 } } }); // LIMIT: 20 METERS
        const lowStockZippers = await Zipper.count({ where: { quantity: { [Op.lt]: 20 } } });           // LIMIT: 20 METERS

        const totalButtonStock = await Button.count();
        const totalFabricStock = await Fabric.count();
        const totalStringsStock = await Strings.count();
        const totalInterliningsStock = await Interlining.count();
        const totalZippersStock = await Zipper.count();

        // CALCULATE TOTAL LOW STOCK MATERIAL COUNT
        const lowStockMaterials = lowStockButtons + lowStockFabrics + lowStockStirngs + lowStockInterlinings + lowStockZippers;
        const totalMaterials = totalButtonStock + totalFabricStock + totalStringsStock + totalInterliningsStock + totalZippersStock;
        let lowerPresentage;

        if(lowStockMaterials && totalMaterials) {
            lowerPresentage = lowStockMaterials / totalMaterials * 100;
        } else {
            lowerPresentage = 0;
        }

        const result = {
            lowStockMaterials: lowStockMaterials,
            totalMaterials: totalMaterials,
            lowerPresentage: lowerPresentage.toFixed(2),
        };
        return result; // SEND CORRECTLY CALCULATED VALUES TO THE INITIAL FUNCTION
    } catch (error) {
        console.log(error);
        const result = {
            lowStockMaterials: 0,
            totalMaterials: 0,
            lowerPresentage: 0.00,
        };
        return result; // SEND 0s WHEN ERROR OCCURS
    }
}


// RECENT TWO WEEKS ORDER COUNT CALCULATING FUNCTION - LOCALLY CALLING (WORKING)
const calculateOrderCount = async () => {
    try {
        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        // CALCULATING WEEKLY ORDERS AND PERCENTAGE
        const thisWeekOrderCount = await PurchaseOrder.count({ where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekOrderCount = await PurchaseOrder.count({ where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        let orderPresentage;

        if(lastWeekOrderCount && thisWeekOrderCount) {
            orderPresentage = (thisWeekOrderCount - lastWeekOrderCount) / lastWeekOrderCount * 100;
        } else if (thisWeekOrderCount) {
            orderPresentage = (thisWeekOrderCount) * 100;
        } else if (lastWeekOrderCount) {
            orderPresentage = -(lastWeekOrderCount) * 100;
        } else {
            orderPresentage = 0;
        }
        
        const result = {
            thisWeekOrderCount: thisWeekOrderCount,
            lastWeekOrderCount: lastWeekOrderCount,
            orderPresentage: orderPresentage.toFixed(2),
        };
        return result; // SEND CORRECTLY CALCULATED VALUES TO THE INITIAL FUNCTION
    } catch (error) {
        console.log(error);
        const result = {
            thisWeekOrderCount: 0,
            lastWeekOrderCount: 0,
            orderPresentage: 0.00,
        };
        return result; // SEND 0s WHEN ERROR OCCURS
    }
}


// RECENT TWO WEEKS INCOME CALCULATING FUNCTION - LOCALLY CALLING (WORKING)
const findIncomeTotal = async () => {
    try {
        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();
        // CALCULATE THE START DATE (14 DAYS BEFORE TODAY)
        const twoWeekAgo = moment().subtract(14, 'days').toDate();

        // CALCULATING WEEKLY INCOME AND PERCENTAGE
        const thisWeekIncome = await Payment.sum( 'amountPaid', { where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } } });
        const lastWeekIncome = await Payment.sum( 'amountPaid', { where: { createdAt: { [Op.gte]: twoWeekAgo, [Op.lte]: weekAgo, } } });
        let incomePercentage;

        if(lastWeekIncome && thisWeekIncome) {
            incomePercentage = (thisWeekIncome - lastWeekIncome) / lastWeekIncome * 100;
        } else if (thisWeekIncome) {
            incomePercentage = (thisWeekIncome) * 100;
        } else if (lastWeekIncome) {
            incomePercentage = -(lastWeekIncome) * 100;
        } else {
            incomePercentage = 0;
        }
        
        const result = {
            thisWeekIncome: thisWeekIncome,
            lastWeekIncome: lastWeekIncome,
            incomePercentage: incomePercentage.toFixed(2),
        };
        return result; // SEND CORRECTLY CALCULATED VALUES TO THE INITIAL FUNCTION
    } catch (error) {
        console.log(error);
        const result = {
            thisWeekIncome: 0,
            lastWeekIncome: 0,
            incomePercentage: 0.00,
        };
        return result; // SEND 0s WHEN ERROR OCCURS
    }
}


// GET RECENT 5 ORDERS - LOCALLY CALLING (WORKING)
const getRecentOrders = async () => {
    try {
        // GET RECENT 5 RECORDS
        const recentOrders = await PurchaseOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
        });
        return recentOrders; // SEND RECENT 5 RECORDS TO THE INITIAL FUNCTION
    } catch (error) {
        console.log(error);
        return null; // SEND NULL WHEN ERROR OCCURS
    }
}


// TO SHOW WEEKLY PERFOMANCE USING CHART - LOCALLY CALLING (WORKING)
const getWeeklyPerformance = async (req, res) => {
    try {
        // INITIALIZE AN EMPTY ARRAY TO STORE DAILY PERFORMANCE DATA
        const thisWeekPerformance = [];
        const lastWeekPerformance = [];

        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();

        for (let i = 0; i < 7; i++) {
            // CALCULATE THE START DATE FOR THE CURRENT DAY (7 DAYS AGO, 6 DAYS AGO, ETC.)
            const startDate = moment().subtract(i, 'days').toDate();
            const lastWeekStartDate = moment().subtract(i + 7, 'days').toDate();

            // CALCULATE THE END DATE FOR THE CURRENT DAY (6 DAYS AGO, 5 DAYS AGO, ETC.)
            const endDate = moment().subtract(i - 1, 'days').toDate();
            const lastWeekEndDate = moment().subtract(i + 6, 'days').toDate();

            // RETRIEVE RECORDS FOR THE CURRENT DAY'S DATE RANGE
            const thisWeekCount = await PurchaseOrder.count({
                where: { createdAt: { [Op.gte]: startDate, [Op.lt]: endDate } },
            });
            const lastWeekCount = await PurchaseOrder.count({
                where: { createdAt: { [Op.gte]: lastWeekStartDate, [Op.lt]: lastWeekEndDate } },
            });

            // PUSH THE DAILY PERFORMANCE DATA TO THE ARRAY
            thisWeekPerformance.push({
                date: startDate, // YOU CAN USE 'STARTDATE' OR 'ENDDATE' AS THE DATE IDENTIFIER
                orderCount: thisWeekCount,
            });
            lastWeekPerformance.push({
                date: lastWeekStartDate, // YOU CAN USE 'STARTDATE' OR 'ENDDATE' AS THE DATE IDENTIFIER
                orderCount: lastWeekCount,
            });
        }
        const weeklyPerformance = {
            thisWeekPerformance: thisWeekPerformance,
            lastWeekPerformance: lastWeekPerformance,
        };
        return weeklyPerformance;
    } catch (error) {
        console.log(error);
        const weeklyPerformance = {
            thisWeekPerformance: null,
            lastWeekPerformance: null,
        };
        return weeklyPerformance;
    }
}