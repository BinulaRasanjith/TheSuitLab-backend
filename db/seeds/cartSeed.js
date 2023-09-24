import { S } from "../../constants/constants.js";


export default [
    {
        customerId: 'USER0000000002',
        itemId: "HC0000000001",
        description: "Tuxedo Shoe Slip-on Classic Patent Leather Loafers",
        price: 1000,
        type: "hire",
        size: S,
        quantity: 1,
    },
    {
        customerId: 'USER0000000002',
        description: "Custom Suit",
        price: 1000,
        // TODO: type: "custom",
        selection: {
            jacket: {
                fabric: "Cotton",
                color: "Black",
            },
            pant: {
                fabric: "Cotton",
                color: "Black",
            },
        },
        quantity: 1,
    }
]