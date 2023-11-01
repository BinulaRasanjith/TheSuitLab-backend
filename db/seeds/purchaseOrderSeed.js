import { PaymentType } from "../../constants/payments.js";
import PurchaseOrderStatus from "../../constants/PurchaseOrderStatus.js";

export default [
    {
        orderId: "PO000001000000001",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.PLACED,
        orderedDate: "2021-09-01",
        collectedDate: null,
    },
    {
        orderId: "PO000000010000002",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.COLLECTED,
        orderedDate: "2021-09-01",
        collectedDate: "2021-09-10",
    },
    {
        orderId: "PO000000100000003",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.PLACED,
        orderedDate: "2021-09-27",
        collectedDate: null,
    }
]