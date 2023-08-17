import Return from "../models/ReturnModel.js";

export const addReturn = async (req, res) => {
    try {
        // request eke body ekjen me pahala thiyena tika ganna
        const {
            referenceNo,
            itemCount,
            orderedDate,
            reason
        } = req.body;

        const returnObj = await Return.create({
            referenceNo,
            itemCount,
            orderedDate,
            reason
        });

        res.status(201).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getReturns = async (req, res) => {
    try {
        const returns = await Return.findAll();
        res.status(200).json(returns);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}