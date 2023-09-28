import { ACCESSORY, COSTUME, HIRE_COSTUME } from "../constants/constants.js";
import { PurchaseOrder, User, ItemModel, HireCostume, Accessory, Costume } from "../models/models.js";

export const getPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.findAll();

        const purchaseOrdersWithCustomer = await Promise.all(purchaseOrders.map(async (purchaseOrder) => {
            purchaseOrder = purchaseOrder.toJSON();
            const user = await User.findOne({ where: { userId: purchaseOrder.customerId } });
            purchaseOrder.customerName = `${user.firstName} ${user.lastName}`
            return purchaseOrder;
        }))

        res.status(200).json(purchaseOrdersWithCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getPurchaseOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const purchaseOrder = await PurchaseOrder.findOne({
            where: { orderId },
            include: {
                model: ItemModel,
                through: 'purchase_order_items',
            }
        });

        // if purchase order not found
        if (!purchaseOrder) {
            return res.status(404).json({ message: "Purchase order not found" });
        }

        const poJSON = purchaseOrder.toJSON();
        const itemModels = poJSON.ItemModels;

        const itemModelsWithData = await Promise.all(itemModels.map(async (itemModel) => {
            switch (itemModel.itemType) {
                case COSTUME:
                    const costume = await Costume.findOne({ where: { itemId: itemModel.itemId } });
                    itemModel.costume = costume.toJSON();
                    console.log(costume);
                    break;
                case HIRE_COSTUME:
                    const hireCostume = await HireCostume.findOne({ where: { itemId: itemModel.itemId } });
                    itemModel.hireCostume = hireCostume.toJSON();
                    break;
                case ACCESSORY:
                    const accessory = await Accessory.findOne({ where: { itemId: itemModel.itemId } });
                    itemModel.accessory = accessory.toJSON();
                    break;
                default:
                    break;
            }
            return itemModel;
        }))

        poJSON.ItemModels = itemModelsWithData;

        res.status(200).json(poJSON);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}