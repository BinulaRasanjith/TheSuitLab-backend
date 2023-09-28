import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL, } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";

export default [
    {
        itemType: "hireSuit",
        price: 3500,
        quantity: 1,
        name: "The black paisley suit with design",
        costumeType: JACKET,
        size: {
            [S]: 3,
            [M]: 1,
            [L]: 3,
        },
        color: "Black",
        price: 4000,
        rentStatus: AVAILABLE,
        images: ["1.webp", "3.webp","4.webp","5.webp"],
    },
    {
        itemType: "hireSuit",
        price: 3200,
        quantity: 1,
        name: "Carmel color high lapel suit",
        costumeType: JACKET,
        size: {
            [S]: 3,
            [M]: 1,
            [L]: 3,
        },
        color: "red",
        rentStatus: AVAILABLE,
        images: ["carmel.webp"],
    },
    {
        itemType: "hireSuit",
        price: 4000,
        quantity: 1,
        name: "burgundy color rounded lapel suit",
        costumeType: JACKET,
        size: {
            [S]: 3,
            [M]: 1,
            [L]: 3,
        },
        color: "Black",
        rentStatus: AVAILABLE,
        images: ["hhb.webp"],
    },
];