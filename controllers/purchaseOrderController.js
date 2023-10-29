import { ACCESSORY, COSTUME, HIRE_COSTUME } from "../constants/constants.js";
import {
    calculateFabricAmount,
    calculateTotalFabricPrice,
} from "../utils/calculatePrice.js";

import {
    PurchaseOrder,
    User,
    ItemModel,
    HireCostume,
    Accessory,
    Costume,
    Material,
} from "../models/models.js";

export const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll();

        const purchaseOrdersWithCustomer = await Promise.all(
            purchaseOrders.map(async (purchaseOrder) => {
                purchaseOrder = purchaseOrder.toJSON();
                const user = await User.findOne({
                    where: { userId: purchaseOrder.customerId },
                });
                purchaseOrder.customerName = `${user.firstName} ${user.lastName}`;
                return purchaseOrder;
            })
        );

        res.status(200).json(purchaseOrdersWithCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPurchaseOrder = async (req, res) => {
    try {
        const { customerId, itemModels } = req.body;
        const purchaseOrder = new PurchaseOrder({ customerId });
        await purchaseOrder.save();

        const purchaseOrderId = purchaseOrder.orderId;

        const itemModelsArray = itemModels.map((itemModel) => {
            return { ...itemModel, orderId: purchaseOrderId };
        });

        await ItemModel.bulkCreate(itemModelsArray);

        res.status(201).json({ message: "Purchase order created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPurchaseOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const purchaseOrder = await PurchaseOrder.findOne({
            where: { orderId },
            include: {
                model: ItemModel,
                through: "purchase_order_items",
            },
        });

        // if purchase order not found
        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        const poJSON = purchaseOrder.toJSON();
        const itemModels = poJSON.ItemModels;

        const itemModelsWithData = await Promise.all(
            itemModels.map(async (itemModel) => {
                switch (itemModel.itemType) {
                    case COSTUME:
                        const costume = await Costume.findOne({
                            where: { itemId: itemModel.itemId },
                        });
                        itemModel.costume = costume.toJSON();
                        console.log(costume);
                        break;
                    case HIRE_COSTUME:
                        const hireCostume = await HireCostume.findOne({
                            where: { itemId: itemModel.itemId },
                        });
                        itemModel.hireCostume = hireCostume.toJSON();
                        break;
                    case ACCESSORY:
                        const accessory = await Accessory.findOne({
                            where: { itemId: itemModel.itemId },
                        });
                        itemModel.accessory = accessory.toJSON();
                        break;
                    default:
                        break;
                }
                return itemModel;
            })
        );

        poJSON.ItemModels = itemModelsWithData;

        res.status(200).json(poJSON);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
  };

export const getPrice = async (req, res) => {
    try {
        let price = 0;
        const { measurement, fabric, pocketColor, selectedCategory } = req.body;

        const entireMaterial = await Material.findOne({
            where: { materialCode: fabric },
        });

        const entireUnitPrice = entireMaterial.unitPrice;
        console.log(entireUnitPrice);

        let pocketUnitPrice = 0;
        if (pocketColor !== null) {
            const pocketMaterial = await Material.findOne({
                where: { materialCode: pocketColor },
            });

            pocketUnitPrice = pocketMaterial.unitPrice;
            console.log(pocketUnitPrice);
        } else {
            pocketUnitPrice = 0;
            console.log(pocketUnitPrice);
        }

        if (selectedCategory === "jacket") {
            const fabricAmount = calculateFabricAmount(
                measurement.coatMeasurements,
                "inch",
                "jacket"
            );

            price = calculateTotalFabricPrice(
                entireUnitPrice,
                pocketUnitPrice,
                fabricAmount,
                "jacket"
            );
        } else if (selectedCategory === "pant") {
            const fabricAmount = calculateFabricAmount(
                measurement.pantMeasurements,
                "inch",
                "pant"
            );

            price = calculateTotalFabricPrice(
                entireUnitPrice,
                pocketUnitPrice,
                fabricAmount,
                "pant"
            );
        } else if (selectedCategory === "all") {
            const jacketFabricAmount = calculateFabricAmount(
                measurement.coatMeasurements,
                "inch",
                "jacket"
            );

            const pantFabricAmount = calculateFabricAmount(
                measurement.pantMeasurements,
                "inch",
                "pant"
            );

            const fabricAmount = jacketFabricAmount + pantFabricAmount;

            price = calculateTotalFabricPrice(
                entireUnitPrice,
                pocketUnitPrice,
                fabricAmount,
                "both"
            );
        }

        console.log(price);
        res.status(200).json({ price });
      
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
      
};

export const updateToCollected = async (req, res) => {
    try {
        const { orderId } = req.body;
        const purchaseOrder = await PurchaseOrder.findOne({ where: { orderId } });
        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        // TODO: FIND THE CUSTOMER AND SEND SMS
        const customer = await User.findOne({ where: { userId: purchaseOrder.customerId } });
        await notifyFitOn(customer.mobileNo);

        purchaseOrder.status = "Collected";
        await purchaseOrder.save();

        res.status(200).json({ message: "Purchase order updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const reverseUpdateToCollected = async (req, res) => {
    try {
        const { orderId } = req.body;
        const purchaseOrder = await PurchaseOrder.findOne({ 
            where: { orderId } 
        });
        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        purchaseOrder.status = "To be collected";
        await purchaseOrder.save();

        res.status(200).json({ message: "Collection cancelled" });

};
  
export const setPurchaseOrder = async (req, res) => {

};