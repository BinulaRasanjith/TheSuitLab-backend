// TABLE FOR SHOPPING CART
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Cart = sequelize.define(
    'Cart',
    {
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // TODO: CHECK THIS AND THINK ABOUT IT
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        measurementType: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        selection: {
            type: DataTypes.JSON,
            allowNull: true,
        }
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;