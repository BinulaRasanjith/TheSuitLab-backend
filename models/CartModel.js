// TABLE FOR SHOPPING CART
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Cart = sequelize.define(
    'Cart',
    {
        // CUSTOMER ID GOT FROM RELATIONSHIPS
        // ITEM ID GOT FROM RELATIONSHIPS

        description: { // ITEM TYPE + REQUIRED DATA
            type: DataTypes.JSONB,
            allowNull: true,
        },
        price: { // PRICE OF THE ITEM
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: { // NUMBER OF ITEMS IN THIS ITEM
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: { // TODO: IS THIS NEEDED?
            type: DataTypes.TEXT,
            allowNull: true,
        },
        measurement: { // MEASUREMENT OF THE CUSTOMER 
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;