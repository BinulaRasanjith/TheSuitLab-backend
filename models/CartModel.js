// TABLE FOR SHOPPING CART
import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Cart = sequelize.define(
    'Cart',
    {
        customerId: {
            type: DataTypes.TEXT,
            allowNull: false,
            compositePrimaryKey: true,
        },
        itemId: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true, // TODO: SAME ITEM MODEL HAVE SAME ITEM ID ?
            compositePrimaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        quantity: { // TODO: CHECK THIS AND THINK ABOUT IT
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'shopping_cart',
    }
);

export default Cart;