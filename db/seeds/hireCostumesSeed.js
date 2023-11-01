import { JACKET, PANT } from "../../constants/constants.js";
import { S, M, L, XL, XXL } from "../../constants/constants.js";
import { AVAILABLE, UNAVAILABLE } from "../../constants/constants.js";
import itemType from "../../constants/itemType.js";

export default [
  {
    itemType: itemType.HIRE_SUIT,
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
    images: ["1.webp", "3.webp", "4.webp", "5.webp"],
  },
  {
    itemType: itemType.HIRE_SUIT,
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
    itemType: itemType.HIRE_SUIT,
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
    images: [
      "mens_sport_coat_casual_blazer_1.jpg",
      "mens_sport_coat_casual_blazer_2.jpg",
      "mens_sport_coat_casual_blazer_3.jpg",
      "mens_sport_coat_casual_blazer_4.jpg",
    ],
  },
  {
    itemType: itemType.HIRE_SUIT,
    price: 4200,
    quantity: 1,
    name: "Soojun Men's Classic Fit Flex Waist Flat Front Dress Pant",
    costumeType: PANT,
    size: {
      [S]: 1,
      [M]: 1,
      [L]: 1,
    },
    color: "Black",
    rentStatus: AVAILABLE,
    images: [
      "black_pant(1).webp",
      "black_pant(2).webp",
      "black_pant(3).webp",
      "black_pant(4).webp",
    ],
  },
  {
    itemType: itemType.HIRE_SUIT,
    price: 4000,
    quantity: 2,
    name: "Van Heusen Men's Slim Fit Flex Flat Front Pant",
    costumeType: PANT,
    size: {
      [S]: 0,
      [M]: 1,
      [L]: 2,
    },
    color: "Gray",
    rentStatus: AVAILABLE,
    images: [
      "van_heusen_gray_slim_fit_pant_1.jpg",
      "van_heusen_gray_slim_fit_pant_2.jpg",
      "van_heusen_gray_slim_fit_pant_3.jpg",
      "van_heusen_gray_slim_fit_pant_4.jpg",
      "van_heusen_gray_slim_fit_pant_5.jpg",
    ],
  },
];
