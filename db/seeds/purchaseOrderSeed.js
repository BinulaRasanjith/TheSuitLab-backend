import { PaymentType } from "../../constants/payments.js";
import PurchaseOrderStatus from "../../constants/PurchaseOrderStatus.js";

export default [
    {
        orderId: "PO000000000000001",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.PLACED,
        orderedDate: "2021-09-01",
        collectedDate: null,
    },
    {
        orderId: "PO000000000000002",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.PLACED,
        orderedDate: "2021-09-01",
        collectedDate: null,
    },
    {
        orderId: "PO000000000000003",
        quantity: 1,
        paymentMethod: PaymentType.CARD,
        status: PurchaseOrderStatus.PLACED,
        orderedDate: "2021-09-27",
        collectedDate: null,
    }
]