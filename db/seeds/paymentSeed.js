import { PaymentType } from "../../constants/payments.js";

export default [
    {
        invoiceNo: "PAY0000000001",
        method: PaymentType.CARD,
        amountPaid: 15000,
    },
    {
        invoiceNo: "PAY0000000002",
        method: PaymentType.CARD,
        amountPaid: 20000,
    },
    {
        invoiceNo: "PAY0000000003",
        method: PaymentType.CARD,
        amountPaid: 30000,
    },
]