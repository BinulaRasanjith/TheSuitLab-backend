import { PurchaseOrder, User } from "../models/models.js";

export const getPurchaseOrders = async (req, res) => {

    try {
        const purchaseOrders = await PurchaseOrder.findAll();
        const purchaseOrdersWithCustomer = [];
        purchaseOrders.forEach(async (purchaseOrder) => {
            const user = await User.findOne({ where: { userId: purchaseOrder.customerId } });
            purchaseOrder.customerName = `${user.firstName} ${user.lastName}`

        })
        res.status(200).json(purchaseOrders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}