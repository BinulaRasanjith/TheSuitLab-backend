// TABLE FOR SHOPPING CART
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Cart = sequelize.define(
    'Cart',
    {
        description: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: { // not available or else
            type: DataTypes.TEXT,
            allowNull: false,
        },
        measurement: { // measurement of the customer
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;