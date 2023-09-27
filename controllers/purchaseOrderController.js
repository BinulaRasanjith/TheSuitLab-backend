import { PurchaseOrder, User } from "../models/models.js";

export const getPurchaseOrders = async (req, res) => {

    try {
        const purchaseOrders = await PurchaseOrder.findAll();

        // purchaseOrders.forEach(async (purchaseOrder) => {
        //     const user = await User.findOne({ where: { userId: purchaseOrder.customerId } });
        //     purchaseOrder.customerName = `${user.firstName} ${user.lastName}`

        // })

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