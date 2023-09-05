import Return from "../models/ReturnModel.js";

// ADDING FUNCTION
export const addReturn = async (req, res) => {
    try {
        // request eke body eken me pahala thiyena tika ganna
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
export const test = async (req, res) => {
    res.status(200).json({ message: "test" });
}

// READING FUNCTION
export const getReturns = async (req, res) => {
    try {
        const returns = await Return.findAll();
        res.status(200).json(returns);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

// REMOVING FUNCTION
export const removeReturn = async (req, res) => {
    try {
        const { referenceNo } = req.body;

        const returnsuit = await Return.findOne({ where: { referenceNo } });
        if (!returnsuit) {
            return res.status(404).json({ message: "Returned suit not found" });
        }

        await Return.destroy({ where: { referenceNo } });
        return res.status(200).json({ message: "Return record deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// UPDATING FUNCTION
export const updateReturn = async (req, res) => {
    try {
        const { referenceNo } = req.params; // Assuming you pass the return ID in the URL
        const { reason } = req.body;

        // Find the return by ID
        const returnObj = await Return.findByPk(referenceNo);

        if (!returnObj) {
            return res.status(404).json({ message: "Return not found" });
        }

        // Update the reason field
        returnObj.reason = reason;
        await returnObj.save();

        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}