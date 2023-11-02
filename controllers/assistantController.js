import { Customer, ItemModel, PurchaseOrder, User } from "../models/models.js";

export const removeItem = async (req, res) => {
    try {
        const { id } = req.body;

        const found = await ItemModel.findOne({ where: { itemId: id, } });
        if (!found) {
            return res.status(404).json({ message: "Requested item not found!" });
        }

        await ItemModel.destroy({ where: { itemId: id, } });
        return res.status(200).json({ message: "Item removed" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const recentOrders = async (req, res) => {
    try {
        const recentOrders = await PurchaseOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
            include: [
                {
                    model: Customer,
                    required: true,
                    include: [
                        {
                            model: User,
                            required: true,
                            attributes: ['firstName', 'lastName'],
                        },
                    ],
                    attributes: ['userId',],
                },
            ],
            attributes: ['quantity', 'totalAmount', 'status'],
        });
        return res.status(200).json(recentOrders);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};