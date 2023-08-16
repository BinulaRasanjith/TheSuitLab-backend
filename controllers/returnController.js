import Return from "../models/ReturnModel.js";

export const addReturn = async (req, res) => {
    try {
        // request eke body ekjen me pahala thiyena tika ganna
        const {
            referenceNo,
            itemCount,
            reason
        } = req.body;

        const returnObj = await Return.create({
            referenceNo,
            itemCount,
            reason
        });

        res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}