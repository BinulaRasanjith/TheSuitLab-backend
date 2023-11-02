import { ACCESSORY, COSTUME, HIRE_COSTUME, PRODUCT_MANAGER } from "../constants/constants.js";
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
    Payment,
    PaymentDone,
    Cart,
} from "../models/models.js";
import ItemType from "../constants/itemType.js";

import { sendNotification } from '../utils/notificationUtil.js';
import CostumeProgress from "../constants/CostumeProgress.js";

export const getCustomersPurchaseOrders = async (req, res) => {
    try {
        const { customerId } = req.params;
        const purchaseOrders = await PurchaseOrder.findAll({
            where: { customerId },
        });

        // get items for each purchase order
        const purchaseOrdersWithItems = await Promise.all(
            purchaseOrders.map(async (purchaseOrder) => {
                let itemModels = await purchaseOrder.getItemModels();

                itemModels = await Promise.all(
                    itemModels.map(async (itemModel) => {
                        itemModel = itemModel.toJSON();
                        switch (itemModel.itemType) {
                            case ItemType.CUSTOM_SUIT:  // CUSTOM SUIT
                                const costume = await Costume.findOne({
                                    where: { itemId: itemModel.itemId },
                                });
                                itemModel.costume = costume.toJSON();
                                break;
                            case ItemType.HIRE_SUIT: // HIRE SUIT

                                const hireCostume = await HireCostume.findOne({
                                    where: { itemId: itemModel.itemId },

                                });
                                itemModel.hireCostume = hireCostume.toJSON();
                                break;
                            case ItemType.ACCESSORY: // ACCESSORY

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

                purchaseOrder = purchaseOrder.toJSON();
                purchaseOrder.items = itemModels;

                return purchaseOrder;
            })
        );

        const cleanArray = []

        purchaseOrdersWithItems.forEach((purchaseOrder) => {
            const { items, ...order } = purchaseOrder;

            items.forEach((item) => {
                cleanArray.push({
                    ...order,
                    ...item
                })
            })
        });

        res.status(200).json(cleanArray);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
        const { paymentDoneId, customerId, items, amount, method } = req.body;
        const quantity = items.length;

        const paymentDone = await PaymentDone.findByPk(paymentDoneId);

        if (paymentDone) {
            const payment = await Payment.create({
                customerId,
                method,
                amountPaid: amount,
            });
            console.log("payment created");

            const purchaseOrder = new PurchaseOrder({
                customerId,
                quantity,
                totalAmount: amount,
                paymentMethod: method,
                paymentId: payment.invoiceNo,
                orderedDate: payment.date,
            });
            await purchaseOrder.save();

            console.log("purchase order created");

            for (const item of items) {
                const { itemId } = item;
                const itemModel = await ItemModel.findByPk(itemId);
                if (itemModel) {
                    Cart.destroy({
                        where: { itemId },
                    });

                    await purchaseOrder.addItemModel(itemModel);
                    console.log("item added to purchase order");
                }
            }
            // send notifications to Product Managers
            const productManagers = await User.findAll({
                where: { role: PRODUCT_MANAGER },
            });

            for (const productManager of productManagers) {
                await sendNotification(productManager.userId, "New Purchase Order", "New purchase order has been created")
            }

            res.status(201).json({ message: "Purchase order created" });
        } else {
            res.status(404).json({ message: "Payment done not found" });
        }
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
                    case ItemType.CUSTOM_SUIT:
                        const costume = await Costume.findOne({
                            where: { itemId: itemModel.itemId },
                        });
                        itemModel.costume = costume.toJSON();
                        break;
                    case ItemType.HIRE_SUIT:
                        const hireCostume = await HireCostume.findOne({
                            where: { itemId: itemModel.itemId },
                        });
                        itemModel.hireCostume = hireCostume.toJSON();
                        break;
                    case ItemType.ACCESSORY:
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
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const assignTailor = async (req, res) => {
    const { itemId, tailor } = req.body;
    console.log(req.body);
    try {
        const costume = await Costume.findOne({ where: { itemId } });
        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }

        costume.tailor = tailor;
        costume.progress = CostumeProgress.PROCESSING;
        await costume.save();

        sendNotification(tailor, "New Costume", "You have been assigned to a new costume");

        res.status(200).json({ message: "Tailor assigned" });
    } catch (error) {
        console.log(error)
    }
};

export const getAssignedTailorForCostume = async (req, res) => {
    const { itemId } = req.params;
    try {
        const costume = await Costume.findOne({ where: { itemId } });
        if (!costume) {
            return res.status(404).json({ message: "Costume not found" });
        }

        const tailor = await User.findOne({ where: { userId: costume.tailor } });

        res.status(200).json({ tailor });
    } catch (error) {
        console.log(error)
    }
};

export const getTailorsPurchaseOrders = async (req, res) => {
    try {
        const { tailorId } = req.params;
        const costumes = await Costume.findAll({
            where: { tailor: tailorId }
        });

        const items = await Promise.all(
            costumes.map(async (costume) => {
                const item = await ItemModel.findOne({
                    where: { itemId: costume.itemId }
                });
                return item;
            })
        );

        console.log(items);

        const purchaseOrders = await Promise.all(
            items.map(async (item) => {
                const purchaseOrder = await item.getPurchaseOrders()
                return purchaseOrder[0];
            })
        );

        console.log(purchaseOrders);

        res.status(200).json(purchaseOrders);
    } catch (error) {
        console.log(error)
    }
};
