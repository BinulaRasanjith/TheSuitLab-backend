import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL, } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";

export default [
    {
        name: "Tuxedo Shoe Slip-on Classic Patent Leather Loafers",
        costumeType: JACKET,
        size: [
            {size: S, quantity: 2},
            {size: M, quantity: 1},
            {size: L, quantity: 3},
        ],
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["1.webp"]
    },
    {
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: JACKET,
        size: [
            {size: S, quantity: 3},
            {size: M, quantity: 1},
            {size: L, quantity: 3},
            {size: XL, quantity: 2},
        ],
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["h1.webp"]
    },
    {
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: PANT,
        size: [
            {size: S, quantity: 3},
            {size: M, quantity: 1},
            {size: L, quantity: 3},
            {size: XL, quantity: 2},
        ],
        color: "Black",
        price: 1000,
        status: UNAVAILABLE,
        images: ["hhb.webp"]
    },
];