import Return from "../models/ReturnModel.js";
import CostumeOrder from "../models/CostumeOrderModel.js";

// ADDING FUNCTION
export const addReturn = async (req, res) => {
    try {
        // REQUEST EKE BODY EKEN ME PAHALA THIYENA TIKA GANNA
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
        const { referenceNo } = req.params; // ASSUMING YOU PASS THE RETURN ID IN THE URL
        const { reason } = req.body;

        // FIND THE RETURN BY ID
        const returnObj = await Return.findByPk(referenceNo);

        if (!returnObj) {
            return res.status(404).json({ message: "Return not found" });
        }

        // UPDATE THE REASON FIELD
        returnObj.reason = reason;
        await returnObj.save();

        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// UPDATING FUNCTION
export const completeReturn = async (req, res) => {
    try {
        const { referenceNo } = req.params; // ASSUMING YOU PASS THE RETURN ID IN THE URL
        const { status } = req.body;

        // FIND THE RETURN BY ID
        const returnObj = await Return.findByPk(referenceNo);

        if (!returnObj) {
            return res.status(404).json({ message: "Return not found" });
        }

        // UPDATE THE REASON FIELD
        returnObj.status = status;
        await returnObj.save();

        res.status(200).json(returnObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// GETTING ORDERS FOR DROPDOWN
export const getOrders = async (req, res) => {
    try {
        // CALCULATE THE END DATE (TODAY)
        const today = moment().toDate();
        // CALCULATE THE START DATE (7 DAYS BEFORE TODAY)
        const weekAgo = moment().subtract(7, 'days').toDate();


        // TODO: UNCOMMENT THIS IF YOU WANT TO FILTER BY TYPE
        // const { costume } = req.body;
        // let returnables;

        // if (type) { // IF TYPE IS SPECIFIED
        //     returnables = await CostumeOrder.findAll({
        //         where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, }, costumeId: costume },
        //         attributes: ['costumeId'],
        //     });
        // } else { // IF TYPE IS NOT SPECIFIED
        //     returnables = await CostumeOrder.findAll({
        //         where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } },
        //         attributes: ['costumeId'],
        //     });
        // }

        // CALCULATING THIS WEEK PROCESSING ORDERS AND PERCENTAGE
        const returnables = await CostumeOrder.findAll({
            where: { createdAt: { [Op.gte]: weekAgo, [Op.lte]: today, } },
            attributes: ['costumeId'],
        });

        const dropdownOptions = returnables.map(order => ({
            value: order.costumeId,     // REPLACE WITH THE ACTUAL ATTRIBUTE FOR THE OPTION'S VALUE
            label: order.costumeId,     // REPLACE WITH THE ACTUAL ATTRIBUTE FOR THE OPTION'S LABEL
        }));
        
        res.status(200).json(dropdownOptions);
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: error.message });
    }
}