import { ItemModel } from "../models/models.js";

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