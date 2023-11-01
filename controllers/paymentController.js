import {
    Payment,
    PaymentDone,
} from "../models/models.js";

export const startPayment = async (req, res) => {
    try {
        const paymentDone = await PaymentDone.create({
            done: false,
        });

        res.status(200).json({ paymentDone, });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const notifyPaymentDone = async (req, res) => {
    const { paymentDoneId } = req.params;

    try {
        const paymentDone = await PaymentDone.findByPk(paymentDoneId);

        if (paymentDone) {
            paymentDone.done = true;
            await paymentDone.save();

            res.status(200).json({ paymentDone });
        } else {
            res.status(404).json({ message: "Payment done not found" });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};