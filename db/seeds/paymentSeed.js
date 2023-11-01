import { PaymentType } from "../../constants/payments.js";

export default [
    {
        invoiceNo: "PAY0000010001",
        method: PaymentType.CARD,
        amountPaid: 15000,
    },
    {
        invoiceNo: "PAY0000100002",
        method: PaymentType.CARD,
        amountPaid: 20000,
    },
    {
        invoiceNo: "PAY0000100003",
        method: PaymentType.CARD,
        amountPaid: 30000,
    },
]