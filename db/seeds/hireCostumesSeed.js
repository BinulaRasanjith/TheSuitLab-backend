import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL, } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";

export default [
    {
        name: "Tuxedo Shoe Slip-on Classic Patent Leather Loafers",
        costumeType: JACKET,
        size: S,
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["1.webp"]
    },
    {
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: JACKET,
        size: M,
        color: "Black",
        price: 1000,
        status: AVAILABLE,
        images: ["h1.webp"]
    },
    {
        name: "Plain Toe Genuine Leather Dress Shoes",
        costumeType: PANT,
        size: L,
        color: "Black",
        price: 1000,
        status: UNAVAILABLE,
        images: ["hhb.webp"]
    },
];