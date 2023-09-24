import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL, } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";

export default [
    {
        hireCostumeId: "HC0000000001",
        name: "Tuxedo Shoe Slip-on Classic Patent Leather Loafers",
        costumeType: JACKET,
        size: [
            { size: S, quantity: 2 },
            { size: M, quantity: 1 },
            { size: L, quantity: 3 },
        ],
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["1.webp"]
    },
    {
        hireCostumeId: "HC0000000002",
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: JACKET,
        size: [
            { size: S, quantity: 3 },
            { size: M, quantity: 1 },
            { size: L, quantity: 3 },
            { size: XL, quantity: 2 },
        ],
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["h1.webp"]
    },
    {
        hireCostumeId: "HC0000000003",
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: PANT,
        size: [
            { size: S, quantity: 3 },
            { size: M, quantity: 1 },
            { size: L, quantity: 3 },
            { size: XL, quantity: 2 },
        ],
        color: "Black",
        price: 1000,
        status: UNAVAILABLE,
        images: ["hhb.webp"]
    },
];