import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL, } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";

export default [
    {
        
        itemId: "1",
        itemType: "hireSuit",
        price: 1000,
        quantity: 1,
        name: "Tuxedo Shoe Slip-on Classic Patent Leather Loafers",
        costumeType: JACKET,
        size: {
            S: 3,
            M: 1,
            L: 3,
        },
        color: "Black",
        price: 1000,
        rentStatus: AVAILABLE,
        images: ["1.webp"],
    },
    {
        itemId: "2",
        itemType: "hireSuit",
        price: 2000,
        quantity: 1,
        name: "The blue white suit",
        costumeType: JACKET,
        size: {
            S: 3,
            M: 1,
            L: 3,
        },
        color: "red",
        price: 1000,
        rentStatus: AVAILABLE,
        images: ["1.webp"],
    },
    {
        itemId: "3",
        itemType: "hireSuit",
        price: 4000,
        quantity: 1,
        name: "leathers",
        costumeType: JACKET,
        size: {
            S: 3,
            M: 1,
            L: 3,
        },
        color: "Black",
        price: 1000,
        rentStatus: AVAILABLE,
        images: ["1.webp"],
    },
];